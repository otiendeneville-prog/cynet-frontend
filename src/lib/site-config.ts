export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://cyneteastafrica.com").replace(/\/+$/, "");
export const WP_API_URL = (import.meta.env.VITE_WP_API_URL || "https://api.cyneteastafrica.com/wp-json").replace(/\/+$/, "");
export const WP_REST_BASE = `${WP_API_URL}/wp/v2`;

export const absoluteUrl = (path: string) => {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
};
