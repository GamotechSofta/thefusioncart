import { Product } from '../models/product.js';
import {
  buildProductCategoryAndFilter,
  slugify,
  buildLooseCategoryRegex,
  withHiddenSubcategoriesExcluded,
  isHiddenSubcategoryValue,
} from '../utils/productCategoryFilter.js';
import { toPublicImageUrl, getPublicBaseUrl } from '../utils/imageUrl.js';

const applyPublicImageUrls = (productObj) => {
  const baseUrl = getPublicBaseUrl();

  if (productObj['Image Link']) {
    productObj['Image Link'] = toPublicImageUrl(productObj['Image Link'], baseUrl);
  }
  if (typeof productObj.image === 'string') {
    productObj.image = toPublicImageUrl(productObj.image, baseUrl);
  }
  if (productObj.imageLink) {
    productObj.imageLink = toPublicImageUrl(productObj.imageLink, baseUrl);
  }

  if (productObj.images) {
    if (Array.isArray(productObj.images)) {
      const imagesObj = {};
      productObj.images.forEach((img, index) => {
        if (img && img.url) {
          imagesObj[`image${index + 1}`] = toPublicImageUrl(img.url, baseUrl);
        } else if (typeof img === 'string') {
          imagesObj[`image${index + 1}`] = toPublicImageUrl(img, baseUrl);
        }
      });
      if (Object.keys(imagesObj).length > 0) {
        productObj.images = imagesObj;
      }
    } else if (typeof productObj.images === 'object') {
      const processedImages = {};
      ['image1', 'image2', 'image3'].forEach((key) => {
        if (productObj.images[key]) {
          processedImages[key] = toPublicImageUrl(productObj.images[key], baseUrl);
        }
      });
      productObj.images = processedImages;
    }
  }

  return productObj;
};

const parseRupeeToNumber = (value) => {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  const numeric = String(value).replace(/[^0-9.]/g, '');
  const parsed = Number(numeric);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const getProducts = async (req, res) => {
  try {
    const rawMain = (req.query.mainCategory || req.query.main || req.query.rootCategory || '').toString();
    const rawCategory = (req.query.category || '').toString();
    const rawSubCategory = (req.query.subcategory || req.query.subCategory || req.query.subSubCategory || '').toString();

    const query = withHiddenSubcategoriesExcluded(
      buildProductCategoryAndFilter(rawMain, rawCategory, rawSubCategory)
    );
    const mainSlug = slugify(rawMain);
    const categorySlug = slugify(rawCategory);
    const subCategorySlug = slugify(rawSubCategory);
    const mainLooseRe = buildLooseCategoryRegex(rawMain || mainSlug.replace(/-/g, ' '));
    const categoryLooseRe = buildLooseCategoryRegex(rawCategory || categorySlug.replace(/-/g, ' '));
    const subCategoryLooseRe = buildLooseCategoryRegex(rawSubCategory || subCategorySlug.replace(/-/g, ' '));

    const parsedLimit = Number.parseInt(req.query.limit, 10);
    const limit = Number.isFinite(parsedLimit) && parsedLimit > 0 ? Math.min(parsedLimit, 24) : null;
    const random = String(req.query.random || '').toLowerCase() === 'true';

    const sampleOrFind = async (match) => {
      if (random && limit) {
        return Product.aggregate([{ $match: match }, { $sample: { size: limit } }]);
      }
      let productsQuery = Product.find(match).sort({ _id: -1 });
      if (limit) productsQuery = productsQuery.limit(limit);
      return productsQuery;
    };

    let products = await sampleOrFind(query);

    // Fallback for manually inserted raw dataset docs:
    // if strict 3-level match returns no rows, try relaxed leaf match.
    if (products.length === 0 && (subCategoryLooseRe || rawSubCategory)) {
      const leafRegex = subCategoryLooseRe || new RegExp(rawSubCategory, 'i');
      const fallbackMatch = {
        $or: [
          { 'taxonomy.subSubCategorySlug': subCategorySlug },
          { subSubCategory: { $regex: leafRegex } },
          { subcategory: { $regex: leafRegex } },
          { 'Sub-sub-Category': { $regex: leafRegex } },
          { 'Sub-Category': { $regex: leafRegex } },
          { title: { $regex: leafRegex } },
          { 'SKU Name': { $regex: leafRegex } },
        ],
      };
      products = await sampleOrFind(fallbackMatch);
    }

    // Native Mongo fallback for raw-key docs inserted directly via Compass.
    // This bypasses mongoose strict query/path filtering for keys like `Sub-Category`.
    if (products.length === 0) {
      const rawAnd = [];
      if (mainLooseRe) rawAnd.push({ Category: { $regex: mainLooseRe } });
      if (categoryLooseRe) rawAnd.push({ 'Sub-Category': { $regex: categoryLooseRe } });
      if (subCategoryLooseRe) rawAnd.push({ 'Sub-sub-Category': { $regex: subCategoryLooseRe } });

      const rawQuery = rawAnd.length > 0 ? { $and: rawAnd } : {};
      if (random && limit) {
        products = await Product.collection.aggregate([
          { $match: rawQuery },
          { $sample: { size: limit } },
        ]).toArray();
      } else {
        const rawDocs = await Product.collection.find(rawQuery).sort({ _id: -1 }).toArray();
        products = limit ? rawDocs.slice(0, limit) : rawDocs;
      }
    }

    products = products.filter((product) => {
      const productObj = typeof product?.toObject === 'function' ? product.toObject() : product;
      return !isHiddenSubcategoryValue(
        productObj?.taxonomy?.subCategorySlug ||
          productObj?.taxonomy?.subCategory ||
          productObj?.subcategory ||
          productObj?.['Sub-Category']
      );
    });

    // Process image URLs to ensure they're absolute
    products = products.map(product => {
      const productObj = typeof product?.toObject === 'function' ? product.toObject() : { ...product };

      // Normalize raw dataset-shaped documents into frontend shape.
      if (!productObj.title && productObj['SKU Name']) {
        productObj.title = productObj['SKU Name'];
      }
      if ((!productObj.mrp || Number.isNaN(Number(productObj.mrp))) && productObj['MRP']) {
        productObj.mrp = parseRupeeToNumber(productObj['MRP']);
      }
      if (!productObj.description && productObj['About the Product']) {
        productObj.description = productObj['About the Product'];
      }
      if (!productObj.category && productObj['Category']) {
        productObj.category = productObj['Category'];
      }
      if (!productObj.subcategory && productObj['Sub-Category']) {
        productObj.subcategory = productObj['Sub-Category'];
      }
      if (!productObj.subSubCategory && productObj['Sub-sub-Category']) {
        productObj.subSubCategory = productObj['Sub-sub-Category'];
      }
      if (!productObj.product_info) {
        productObj.product_info = {};
      }
      if (!productObj.product_info.brand && productObj['Brand']) {
        productObj.product_info.brand = productObj['Brand'];
      }
      if (!productObj.images) {
        productObj.images = {};
      }
      if (!productObj.images.image1 && productObj['Image Link']) {
        productObj.images.image1 = productObj['Image Link'];
      }

      applyPublicImageUrls(productObj);
      return productObj;
    });

    if (limit) products = products.slice(0, limit);
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      message: 'Error fetching products', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Convert to plain object to modify
    const productObj = product.toObject();

    // Normalize raw dataset-shaped documents into frontend shape.
    if (!productObj.title && productObj['SKU Name']) {
      productObj.title = productObj['SKU Name'];
    }
    if ((!productObj.mrp || Number.isNaN(Number(productObj.mrp))) && productObj['MRP']) {
      productObj.mrp = parseRupeeToNumber(productObj['MRP']);
    }
    if (!productObj.description && productObj['About the Product']) {
      productObj.description = productObj['About the Product'];
    }
    if (!productObj.category && productObj['Category']) {
      productObj.category = productObj['Category'];
    }
    if (!productObj.subcategory && productObj['Sub-Category']) {
      productObj.subcategory = productObj['Sub-Category'];
    }
    if (!productObj.subSubCategory && productObj['Sub-sub-Category']) {
      productObj.subSubCategory = productObj['Sub-sub-Category'];
    }
    if (!productObj.product_info) {
      productObj.product_info = {};
    }
    if (!productObj.product_info.brand && productObj['Brand']) {
      productObj.product_info.brand = productObj['Brand'];
    }
    // Keep brand at root for existing UI checks
    if (!productObj.brand && (productObj['Brand'] || productObj.product_info?.brand)) {
      productObj.brand = productObj['Brand'] || productObj.product_info.brand;
    }
    if (!productObj.images) {
      productObj.images = {};
    }
    if (!productObj.images.image1 && productObj['Image Link']) {
      productObj.images.image1 = productObj['Image Link'];
    }

    applyPublicImageUrls(productObj);
    
    res.json(productObj);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ 
      message: 'Error fetching product', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
