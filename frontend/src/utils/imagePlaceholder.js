/**
 * Generates a data URI for a placeholder image
 * Works offline - no external requests needed
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {string} text - Text to display (optional)
 * @returns {string} Data URI string
 */
export const getPlaceholderImage = (width = 300, height = 400, text = 'No Image') => {
  // Create SVG as data URI - works offline
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text 
        x="50%" 
        y="50%" 
        font-family="Arial, sans-serif" 
        font-size="14" 
        fill="#9ca3af" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >
        ${text}
      </text>
    </svg>
  `.trim();
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Pre-defined placeholder images for common sizes
export const placeholders = {
  productList: getPlaceholderImage(300, 400, 'Image Not Available'),
  productDetail: getPlaceholderImage(600, 800, 'Image Not Available'),
  thumbnail: getPlaceholderImage(60, 80, 'No Image'),
  wishlist: getPlaceholderImage(600, 800, 'Image Not Available'),
  product: getPlaceholderImage(300, 400, 'Image Not Available'), // Alias for productList
};

/** Prefer CDN hosts that allow embedding (BigBasket hotlinks often fail). */
export const rewriteProductImageUrl = (url = '') => {
  if (!url || typeof url !== 'string') return '';
  let next = url.trim();
  if (!next || next === 'null' || next === 'undefined') return '';
  next = next.replace(/^http:\/\//i, 'https://');
  next = next.replace(/https?:\/\/(?:www\.)?bigbasket\.com\/media\//i, 'https://www.bbassets.com/media/');
  return next;
};

const firstUsableUrl = (...candidates) => {
  for (const value of candidates) {
    const url = rewriteProductImageUrl(value);
    if (url) return url;
  }
  return '';
};

/**
 * Safely gets image URL from product object
 * Handles both object format (image1, image2, image3) and array format
 * @param {Object} product - Product object
 * @param {string} imageKey - Which image to get ('image1', 'image2', 'image3', or first available)
 * @returns {string} Image URL or placeholder
 */
export const getProductImage = (product, imageKey = 'image1') => {
  if (!product) {
    return placeholders.productList;
  }

  const fromImagesObject = () => {
    if (!product.images || typeof product.images !== 'object' || Array.isArray(product.images)) {
      return '';
    }
    return firstUsableUrl(
      product.images[imageKey],
      product.images.image1,
      product.images.image2,
      product.images.image3,
      product.images.url
    );
  };

  const fromImagesArray = () => {
    if (!Array.isArray(product.images) || product.images.length === 0) return '';
    const imageIndex = imageKey === 'image2' ? 1 : imageKey === 'image3' ? 2 : 0;
    const ordered = [product.images[imageIndex], ...product.images];
    const candidates = ordered.flatMap((img) => {
      if (!img) return [];
      if (typeof img === 'string') return [img];
      if (typeof img === 'object') return [img.url, img.image1, img.src];
      return [];
    });
    return firstUsableUrl(...candidates);
  };

  const url =
    fromImagesObject() ||
    fromImagesArray() ||
    firstUsableUrl(
      product.image,
      product['Image Link'],
      product.imageLink,
      product.imageUrl,
      product.sourceData?.imageLink
    );

  return url || placeholders.productList;
};

