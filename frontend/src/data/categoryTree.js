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
      { name: 'Health & Wellness', slug: 'health-and-medicine' },
    ],
  },
];

const beautyMain = categoryTree[0];
const beautyMainSlug = slugifyCategory(beautyMain.name);

export const navbarCategories = beautyMain.subcategories.map((sub) => ({
  name: sub.name,
  slug: sub.slug,
  path: `/category/${beautyMainSlug}/${sub.slug}`,
}));

const displayBySlug = Object.fromEntries(
  beautyMain.subcategories.map((sub) => [sub.slug, sub.name])
);

export const getCategoryDisplayName = (value = '') => {
  if (!value) return '';
  const slug = slugifyCategory(value);
  return displayBySlug[slug] || value;
};
