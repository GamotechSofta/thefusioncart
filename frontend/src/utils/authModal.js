const AUTH_PATHS = ['/signin', '/signup', '/forgot-password'];
const PROTECTED_PREFIXES = ['/cart', '/checkout', '/profile', '/wishlist', '/order-success', '/admin'];

const pathOf = (value) => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return `${value.pathname || ''}${value.search || ''}`;
};

export const getAuthBackgroundState = (location) => {
  const existing = location?.state?.backgroundLocation;
  if (existing?.pathname && !AUTH_PATHS.includes(existing.pathname)) {
    return existing;
  }
  if (location?.pathname && !AUTH_PATHS.includes(location.pathname)) {
    return {
      pathname: location.pathname,
      search: location.search || '',
      hash: location.hash || '',
    };
  }
  return { pathname: '/', search: '', hash: '' };
};

export const getAuthClosePath = (location) => {
  const candidate =
    pathOf(location?.state?.backgroundLocation) ||
    pathOf(location?.state?.from) ||
    '/';
  const pathOnly = candidate.split('?')[0] || '/';
  if (
    AUTH_PATHS.includes(pathOnly) ||
    PROTECTED_PREFIXES.some((prefix) => pathOnly.startsWith(prefix))
  ) {
    return '/';
  }
  return candidate || '/';
};
