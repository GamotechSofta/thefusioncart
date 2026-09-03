export const slugifyCategory = (value = '') =>
  value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

/** Main category → subcategory only (Beauty & Hygiene). `slug` matches catalog URLs. */
export const categoryTree = [
  {
    name: 'Beauty & Hygiene',
    subcategories: [
      { name: 'Skin Essentials', slug: 'skin-care' },
      { name: 'Hair Essentials', slug: 'hair-care' },
      { name: 'Colour & Makeup', slug: 'makeup' },
      { name: 'Bath & Hands', slug: 'bath-and-hand-wash' },
      { name: 'Scents & Deos', slug: 'fragrances-and-deos' },
      { name: 'Dental Care', slug: 'oral-care' },
      { name: 'Feminine Care', slug: 'feminine-hygiene' },
    ],
  },
];

const beautyMain = categoryTree[0];
const beautyMainSlug = slugifyCategory(beautyMain.name);
const beautySubs = beautyMain.subcategories;

export const navbarCategories = beautyMain.subcategories.map((sub) => ({
  name: sub.name,
  slug: sub.slug,
  path: `/category/${beautyMainSlug}/${sub.slug}`,
}));

const displayBySlug = Object.fromEntries(
  beautyMain.subcategories.map((sub) => [sub.slug, sub.name])
);

/** Map display names ("Hair Essentials") and catalog names ("Hair Care") to the same slug. */
export const canonicalSubSlug = (value = '') => {
  const slug = slugifyCategory(value);
  if (!slug || slug === beautyMainSlug) return '';
  const bySlug = beautySubs.find((s) => s.slug === slug);
  if (bySlug) return bySlug.slug;
  const byName = beautySubs.find((s) => slugifyCategory(s.name) === slug);
  if (byName) return byName.slug;
  return slug;
};

export const getCategoryDisplayName = (value = '') => {
  if (!value) return '';
  const slug = slugifyCategory(value);
  return displayBySlug[slug] || displayBySlug[canonicalSubSlug(value)] || value;
};

export const productSubSlug = (p) => {
  const candidates = [
    p?.taxonomy?.subCategorySlug,
    p?.taxonomy?.subCategory,
    p?.subcategory,
    p?.['Sub-Category'],
    p?.category,
    p?.['Category'],
  ];
  for (const value of candidates) {
    const slug = canonicalSubSlug(value);
    if (slug) return slug;
  }
  return '';
};

export const productMatchesSubcategory = (product, selected) => {
  if (!selected) return true;
  const target = canonicalSubSlug(selected);
  if (!target) return true;
  return productSubSlug(product) === target;
};

export const productMatchesMainCategory = (product, selected) => {
  if (!selected) return true;
  const target = slugifyCategory(selected);
  if (!target) return true;
  const candidates = [
    product?.taxonomy?.mainCategorySlug,
    product?.taxonomy?.mainCategory,
    product?.category,
    product?.['Category'],
  ]
    .filter(Boolean)
    .map((value) => slugifyCategory(value));

  if (candidates.some((slug) => slug === target || slug.includes(target) || target.includes(slug))) {
    return true;
  }
  // Many catalog rows store the subcategory in `category`; still count them for Beauty & Hygiene
  if (target === beautyMainSlug && productSubSlug(product)) return true;
  return false;
};
