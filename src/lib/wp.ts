
import { WP_REST_BASE } from "@/lib/site-config";

const WP_BASE = WP_REST_BASE;

const REQUEST_TIMEOUT_MS = 7000;
const MAX_ATTEMPTS = 2;
const CATEGORY_TTL_MS = 5 * 60_000;

export interface WPRendered {
  rendered: string;
  protected?: boolean;
}
export interface WPCourse {
  id: number;
  slug: string;
  date: string;
  link: string;
  title: WPRendered;
  excerpt: WPRendered;
  content?: WPRendered;
  featured_media: number;
  course_category?: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
      media_details?: { sizes?: Record<string, { source_url: string }> };
    }>;
    "wp:term"?: Array<
      Array<{ id: number; name: string; slug: string; taxonomy: string }>
    >;
  };
}
export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  description?: string;
}
export interface WPPage {
  id: number;
  slug: string;
  title: WPRendered;
  content: WPRendered;
  date: string;
  link: string;
}

const buildUrl = (
  path: string,
  params: Record<string, string | number | boolean | undefined> = {},
) => {
  const url = new URL(WP_BASE + path);
  Object.entries(params).forEach(
    ([k, v]) => v !== undefined && url.searchParams.set(k, String(v)),
  );
  return url.toString();
};

/**
 * Fetch with a timeout and one retry on transient origin failures.
 * Without this, a slow WordPress origin leaves the request hanging until the
 * browser gives up (ERR_TIMED_OUT) instead of falling back to cached content.
 */
async function request(
  path: string,
  params: Record<string, string | number | boolean | undefined> = {},
): Promise<Response> {
  const url = buildUrl(path, params);
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });

      if (res.ok) return res;

      const retryable = [408, 429, 500, 502, 503, 504].includes(res.status);
      const error = new Error(`WP request failed: ${res.status}`);
      if (!retryable) throw Object.assign(error, { fatal: true });
      lastError = error;
    } catch (error) {
      if ((error as { fatal?: boolean })?.fatal) throw error;
      lastError = error;
    }

    if (attempt < MAX_ATTEMPTS) {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }

  throw lastError instanceof Error ? lastError : new Error("WP request failed");
}

async function get<T>(
  path: string,
  params: Record<string, string | number | boolean | undefined> = {},
): Promise<T> {
  const res = await request(path, params);
  return res.json();
}

async function getWithTotal<T>(
  path: string,
  params: Record<string, string | number | boolean | undefined> = {},
): Promise<{ data: T; total: number; totalPages: number }> {
  const res = await request(path, params);
  const total = Number(res.headers.get("X-WP-Total") ?? "0");
  const totalPages = Number(res.headers.get("X-WP-TotalPages") ?? "0");
  const data = (await res.json()) as T;
  return { data, total, totalPages };
}

/**
 * Categories are fetched once and cached in memory, so course cards can still
 * show category names now that we no longer embed wp:term on every course.
 */
let categoryCache: WPCategory[] = [];
let categoryCacheAt = 0;

async function loadCategories(): Promise<WPCategory[]> {
  if (categoryCache.length > 0 && Date.now() - categoryCacheAt < CATEGORY_TTL_MS) {
    return categoryCache;
  }

  const items = await get<WPCategory[]>("/course_category", {
    per_page: 50,
    hide_empty: true,
    orderby: "count",
    order: "desc",
  });

  categoryCache = items;
  categoryCacheAt = Date.now();
  return items;
}

export const wp = {
  listCourses: async (
    opts: {
      page?: number;
      perPage?: number;
      search?: string;
      category?: number;
      orderby?: string;
    } = {},
  ) => {
    // Warm the category cache alongside the course request so cards can render
    // category names without an embedded wp:term payload.
    const [result] = await Promise.all([
      getWithTotal<WPCourse[]>("/lp_course", {
        page: opts.page ?? 1,
        per_page: opts.perPage ?? 12,
        search: opts.search,
        course_category: opts.category,
        orderby: opts.orderby ?? "date",
        order: "desc",
        _embed: "wp:featuredmedia",
        _fields:
          "id,slug,title,excerpt,date,link,featured_media,course_category,_links,_embedded",
      }),
      loadCategories().catch(() => []),
    ]);

    return result;
  },

  getCourse: async (slug: string): Promise<WPCourse | null> => {
    const list = await get<WPCourse[]>("/lp_course", {
      slug,
      _embed: "wp:featuredmedia",
    });
    return list[0] ?? null;
  },

  listCategories: () => loadCategories(),

  getPage: async (slug: string): Promise<WPPage | null> => {
    const list = await get<WPPage[]>("/pages", { slug });
    return list[0] ?? null;
  },
};

export const stripHtml = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&hellip;/g, "…")
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "–")
    .trim();

export const featuredImage = (course: WPCourse): string | null => {
  const media = course._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return null;
  return (
    media.media_details?.sizes?.medium_large?.source_url ??
    media.media_details?.sizes?.medium?.source_url ??
    media.source_url
  );
};

export const courseCategories = (course: WPCourse) => {
  // Still works if wp:term is ever embedded again.
  const embedded =
    course._embedded?.["wp:term"]
      ?.flat()
      .filter((t) => t.taxonomy === "course_category") ?? [];

  if (embedded.length > 0) return embedded;

  // Otherwise resolve from the cached category list by ID.
  const byId = new Map(categoryCache.map((category) => [category.id, category]));

  return (course.course_category ?? [])
    .map((id) => byId.get(id))
    .filter((category): category is WPCategory => Boolean(category))
    .map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      taxonomy: "course_category",
    }));
};

