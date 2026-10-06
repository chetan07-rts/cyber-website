const configuredApiUrl = import.meta.env.VITE_API_URL?.trim() || '';
const apiBaseUrl = configuredApiUrl.replace(/\/+$/, '');

export const apiUrl = (path) => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${apiBaseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};
