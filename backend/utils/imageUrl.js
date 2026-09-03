export const getPublicBaseUrl = () =>
  process.env.BASE_URL ||
  process.env.BACKEND_URL ||
  (process.env.NODE_ENV === 'production' ? '' : `http://localhost:${process.env.PORT || 5000}`);

export const toPublicImageUrl = (url, baseUrl = getPublicBaseUrl()) => {
  if (!url || typeof url !== 'string') return url;
  let next = url.trim();
  if (!next) return url;

  next = next.replace(/^http:\/\//i, 'https://');
  next = next.replace(
    /https?:\/\/(?:www\.)?bigbasket\.com\/media\//i,
    'https://www.bbassets.com/media/'
  );

  if (next.startsWith('https://') || next.startsWith('http://') || next.startsWith('//')) {
    return next;
  }

  if (
    next.includes('cloudinary.com') ||
    next.includes('amazonaws.com') ||
    next.includes('bbassets.com')
  ) {
    return next.startsWith('http') ? next : `https://${next}`;
  }

  if (baseUrl) {
    return next.startsWith('/') ? `${baseUrl}${next}` : `${baseUrl}/${next}`;
  }

  return next;
};
