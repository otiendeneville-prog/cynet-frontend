import HeroSection from "@/components/site/HeroSection";
import { createServerFn } from "@tanstack/react-start";
import { email } from "zod";
import { WP_REST_BASE } from "@/lib/site-config";

const WP_BASE = WP_REST_BASE;

interface WPEmbeddedMedia {
  source_url?: string;
  alt_text?: string;
  media_details?: {
    sizes?: Record<string, { source_url?: string }>;
  };
}

interface WPEmbeddedTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy?: string;
  count?: number;
  description?: string;
}

interface WPCourseItem {
  id: number;
  slug: string;
  date: string;
  link: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  content?: { rendered: string };
  featured_media?: number;
  course_category?: number[];
  _embedded?: {
    "wp:featuredmedia"?: WPEmbeddedMedia[];
    "wp:term"?: WPEmbeddedTerm[][];
  };
}

interface WPCategoryItem {
  id: number;
  name: string;
  slug: string;
  count?: number;
  description?: string;
}

interface WPPageItem {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  link: string;
}

export interface Course {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  featured_image: string | null;
  price: number;
  duration: string | null;
  categories: Category[];
  published_at: string | null;

  seo_title?: string | null;
  seo_description?: string | null;
  seo_canonical?: string | null;
  seo_robots_noindex?: boolean;
  og_title?: string | null;
  og_description?: string | null;
}

export interface Page {
  id: number;
  slug: string;
  title: string;
  content: string;
}

export interface OnlineSession {
  start: string;
  end: string;
  schedule: string;
  fee: string;
  ksh: string;
  classroom: string;
  foreign: string;
}

export interface ClassroomSession {
  city: string;
  country: string;
  schedule: string;
  duration: string;
  fee: string;
  ksh?: string;
  classroom?: string;
  foreign?: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface PaginatedCourses {
  data: Course[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface Category {
  id: number;
  name?: string;
  slug: string;
  image?: string;
  seo_title?: string;
  seo_description?: string;
  description?: string;
  courses_count?: number;
}

export interface HeroSection {
  headline: string;
  second_headline: string;
  headline_highlight: string;
  subheadline: string;
  cta_label: string;
  cta_url: string;
  badge_text: string;
  is_active: boolean;
}

const defaultHeroSection: HeroSection = {
  headline: "Empowering professionals through expert training and consultancy",
  second_headline: "for growth, impact, and lasting business value",
  headline_highlight: "Capacity Building",
  subheadline:
    "Cynet East Africa helps businesses and professionals unlock practical skills, stronger leadership, and measurable growth through expert-led training and consultancy.",
  cta_label: "Explore courses",
  cta_url: "/courses",
  badge_text: "NITA Approved",
  is_active: true,
};

const defaultFeaturedCourses: Course[] = [
  {
    id: 1,
    slug: "data-management-and-analysis-stata",
    title: "Data Management and Analysis with Stata",
    excerpt:
      "Learn practical data cleaning, analysis, and reporting using Stata for research and business decision-making.",
    content: "",
    featured_image: null,
    price: 0,
    duration: "5 Days",
    categories: [{ id: 1, slug: "data-analysis", name: "Data Analysis" }],
    published_at: null,
    seo_title: "Data Management and Analysis with Stata",
    seo_description:
      "Learn practical data cleaning, analysis, and reporting using Stata for research and business decision-making.",
    seo_canonical: null,
    seo_robots_noindex: false,
    og_title: "Data Management and Analysis with Stata",
    og_description:
      "Learn practical data cleaning, analysis, and reporting using Stata for research and business decision-making.",
  },
  {
    id: 2,
    slug: "monitoring-and-evaluation-training",
    title: "Monitoring & Evaluation Training",
    excerpt:
      "Build strong M&E skills for planning, implementation, and performance tracking in development and public sector contexts.",
    content: "",
    featured_image: null,
    price: 0,
    duration: "4 Days",
    categories: [{ id: 2, slug: "monitoring-evaluation", name: "Monitoring & Evaluation" }],
    published_at: null,
    seo_title: "Monitoring & Evaluation Training",
    seo_description:
      "Build strong M&E skills for planning, implementation, and performance tracking in development and public sector contexts.",
    seo_canonical: null,
    seo_robots_noindex: false,
    og_title: "Monitoring & Evaluation Training",
    og_description:
      "Build strong M&E skills for planning, implementation, and performance tracking in development and public sector contexts.",
  },
  {
    id: 3,
    slug: "project-management-training",
    title: "Project Management Training",
    excerpt:
      "Strengthen your project planning, execution, and risk management capability with modern project leadership tools.",
    content: "",
    featured_image: null,
    price: 0,
    duration: "5 Days",
    categories: [{ id: 3, slug: "project-management", name: "Project Management" }],
    published_at: null,
    seo_title: "Project Management Training",
    seo_description:
      "Strengthen your project planning, execution, and risk management capability with modern project leadership tools.",
    seo_canonical: null,
    seo_robots_noindex: false,
    og_title: "Project Management Training",
    og_description:
      "Strengthen your project planning, execution, and risk management capability with modern project leadership tools.",
  },
  {
    id: 4,
    slug: "leadership-and-governance",
    title: "Leadership & Governance",
    excerpt:
      "Develop the leadership mindset and governance competencies needed to manage teams and organizations effectively.",
    content: "",
    featured_image: null,
    price: 0,
    duration: "3 Days",
    categories: [{ id: 4, slug: "governance-leadership", name: "Governance & Leadership" }],
    published_at: null,
    seo_title: "Leadership & Governance",
    seo_description:
      "Develop the leadership mindset and governance competencies needed to manage teams and organizations effectively.",
    seo_canonical: null,
    seo_robots_noindex: false,
    og_title: "Leadership & Governance",
    og_description:
      "Develop the leadership mindset and governance competencies needed to manage teams and organizations effectively.",
  },
];

type CourseRegistrationInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  jobTitle: string;
  trainingMode: string;
  participants: string;
  startDate: string;
  endDate: string;
  message: string;
  courseSlug: string;
  courseName: string;
  courseCategory: string;
};
const stripHtml = (value?: string) =>
  value
    ? value
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .trim()
    : "";

const mapCourse = (item: WPCourseItem): Course => {
  const media = item._embedded?.["wp:featuredmedia"]?.[0];
  const featured_image =
    media?.media_details?.sizes?.large?.source_url ??
    media?.media_details?.sizes?.medium_large?.source_url ??
    media?.media_details?.sizes?.medium?.source_url ??
    media?.source_url ??
    null;

  const categories = (item._embedded?.["wp:term"] ?? [])
    .flat()
    .filter((term) => term.taxonomy === "course_category")
    .map((term) => ({
      id: term.id,
      name: term.name,
      slug: term.slug,
      description: term.description,
      courses_count: term.count,
    }));

  const excerpt = item.excerpt?.rendered ?? "";
  const description =
    stripHtml(excerpt) || stripHtml(item.content?.rendered ?? "");

  return {
    id: item.id,
    slug: item.slug,
    title: item.title.rendered,
    excerpt,
    content: item.content?.rendered,
    featured_image: featured_image,
    price: 0,
    duration: null,
    categories,
    published_at: item.date,
    seo_title: item.title.rendered,
    seo_description: description || null,
    seo_canonical: item.link,
    seo_robots_noindex: false,
    og_title: item.title.rendered,
    og_description: description || null,
  };
};

const mapCategory = (item: WPCategoryItem): Category => ({
  id: item.id,
  name: item.name,
  slug: item.slug,
  description: item.description,
  courses_count: item.count,
});

async function get<T>(
  path: string,
  params: Record<string, string | number | boolean | undefined> = {},
): Promise<T> {
  const cleaned = Object.fromEntries(
    Object.entries(params).filter(
      ([, v]) => v !== undefined && v !== null && v !== "",
    ),
  ) as Record<string, string | number | boolean>;

  const query = new URLSearchParams(
    Object.entries(cleaned).reduce<Record<string, string>>(
      (acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      },
      {},
    ),
  ).toString();

  const url = query ? `${WP_BASE}${path}?${query}` : `${WP_BASE}${path}`;

  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${path}`);
  }
  return res.json();
}

async function getWithTotal<T>(
  path: string,
  params: Record<string, string | number | boolean | undefined> = {},
): Promise<{ data: T; total: number; totalPages: number }> {
  const cleaned = Object.fromEntries(
    Object.entries(params).filter(
      ([, v]) => v !== undefined && v !== null && v !== "",
    ),
  ) as Record<string, string | number | boolean>;

  const query = new URLSearchParams(
    Object.entries(cleaned).reduce<Record<string, string>>(
      (acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      },
      {},
    ),
  ).toString();

  const url = query ? `${WP_BASE}${path}?${query}` : `${WP_BASE}${path}`;

  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${path}`);
  }

  const data = (await res.json()) as T;
  return {
    data,
    total: Number(res.headers.get("X-WP-Total") ?? "0"),
    totalPages: Number(res.headers.get("X-WP-TotalPages") ?? "0"),
  };
}

export const api = {
  listCourses: async (
    params: { page?: number; search?: string; category?: number } = {},
  ) => {
    try {
      const items = await get<WPCourseItem[]>("/lp_course", {
        page: params.page ?? 1,
        per_page: 12,
        search: params.search,
        course_category: params.category,
        orderby: "date",
        order: "desc",
        _embed: "wp:featuredmedia,wp:term",
      });
      return items.map(mapCourse);
    } catch (error) {
      console.warn("WordPress course listing is unavailable. Showing fallback course cards.", error);
      return defaultFeaturedCourses;
    }
  },

  getCourse: async (slug: string) => {
    const items = await get<WPCourseItem[]>("/lp_course", {
      slug,
      _embed: "wp:featuredmedia,wp:term",
    });
    return items[0] ? mapCourse(items[0]) : null;
  },

  getHeroSection: async () => {
    try {
      return await get<HeroSection>("/hero-section");
    } catch (error) {
      console.warn("Hero endpoint unavailable, using fallback content.", error);
      return defaultHeroSection;
    }
  },

  listCategories: async () => {
    const items = await get<WPCategoryItem[]>("/course_category", {
      per_page: 50,
      hide_empty: true,
      orderby: "count",
      order: "desc",
    });
    return items.map(mapCategory);
  },

  getPage: async (slug: string) => {
    const items = await get<WPPageItem[]>("/pages", { slug });
    const page = items[0];
    return page
      ? {
          id: page.id,
          slug: page.slug,
          title: page.title.rendered,
          content: page.content.rendered,
        }
      : null;
  },

  listPaginatedCourses: async (
    params: {
      page?: number;
      search?: string;
      category?: number;
      per_page?: number;
    } = {},
  ) => {
    const { data, total, totalPages } = await getWithTotal<WPCourseItem[]>(
      "/lp_course",
      {
        page: params.page ?? 1,
        per_page: params.per_page ?? 12,
        search: params.search,
        course_category: params.category,
        orderby: "date",
        order: "desc",
        _embed: "wp:featuredmedia,wp:term",
      },
    );

    const pagination = {
      current_page: params.page ?? 1,
      last_page: totalPages || 1,
      per_page: params.per_page ?? 12,
      total,
    };

    return {
      data: data.map(mapCourse),
      ...pagination,
      meta: pagination,
    } satisfies PaginatedCourses;
  },

  listTrendingCourses: async () => {
    const items = await get<WPCourseItem[]>("/lp_course", {
      per_page: 5,
      orderby: "date",
      order: "desc",
      _embed: "wp:featuredmedia,wp:term",
    });
    return items.map(mapCourse);
  },

  searchCourses: async (q: string) => {
    const results = await get<{ id: number; slug: string; title: string }[]>(
      "/search",
      { search: q, per_page: 10, subtype: "lp_course" },
    );
    return results;
  },

  getCategoryCourses: async (slug: string) => {
    const categories = await get<WPCategoryItem[]>("/course_category", {
      slug,
      per_page: 1,
    });
    const category = categories[0];
    if (!category) {
      return { category: null, courses: [] };
    }

    const items = await get<WPCourseItem[]>("/lp_course", {
      course_category: category.id,
      per_page: 12,
      _embed: "wp:featuredmedia,wp:term",
    });

    return {
      category: mapCategory(category),
      courses: items.map(mapCourse),
    };
  },

  registerForCourse: (payLoad: CourseRegistrationInput): Promise<string> =>
    registerForCourseFn({ data: payLoad }),
};

export const registerForCourseFn = createServerFn({ method: "POST" })
  .inputValidator((d: CourseRegistrationInput) => d)
  .handler(async ({ data }): Promise<string> => {
    const response = await fetch(
      " https://api.cyneteastafrica.com/wp-json/tcr/v1/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          organization: data.organization,
          jobTitle: data.jobTitle,
          courseName: data.courseName,
          courseCategory: data.courseCategory,
          trainingMode: data.trainingMode,
          participants: Number(data.participants),
          message: data.message,
          startDate: data.startDate,
          endDate: data.endDate,
        }),
      },
    );

    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(
        body?.message ?? `Registration failed ($response.status)`,
      );
    }
    return body.message ?? "Registration received will be intouch shortly";
  });
