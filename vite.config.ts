import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import sitemap from 'vite-plugin-sitemap'

const API_BASE = 'https://api.cyneteastafrica.com/wp-json/wp/v2'

async function fetchAll<T>(endpoint: string): Promise<T[]> {
  const out: T[] = []
  let page = 1
  let totalPages = 1
  do {
    const sep = endpoint.includes('?') ? '&' : '?'
    const res = await fetch(`${API_BASE}/${endpoint}${sep}per_page=100&page=${page}`)
    if (!res.ok) throw new Error(`${endpoint} page ${page} failed: ${res.status}`)
    const data = await res.json()
    if (!Array.isArray(data)) throw new Error(`${endpoint} returned non-array`)
    out.push(...data)

    const header = res.headers.get('X-WP-TotalPages')
    if (page === 1 && header === null) {
      console.warn(`[sitemap] ${endpoint}: X-WP-TotalPages missing, results may be truncated`)
    }
    totalPages = Number(header ?? 1)
    page++
  } while (page <= totalPages)
  return out
}

const getCourseRoutes = async () => {
  const courses = await fetchAll<{ slug: string; seo_robots_noindex?: boolean }>('lp_course')
  const routes = courses.filter((c) => !c.seo_robots_noindex).map((c) => `/course/${c.slug}`)
  console.log(`[sitemap] ${courses.length} courses fetched, ${routes.length} routes`)
  return routes
}

const getCategoryRoutes = async () => {
  const cats = await fetchAll<{ slug: string }>('course_category?hide_empty=true')
  const routes = cats.map((c) => `/category/${c.slug}`)
  console.log(`[sitemap] ${routes.length} category routes`)
  return routes
}

export default defineConfig(async () => {
  const [courseRoutes, categoryRoutes] = await Promise.all([
    getCourseRoutes(),
    getCategoryRoutes(),
  ])

  return {
    server: { port: 3000 },
    plugins: [
      cloudflare({ viteEnvironment: { name: 'ssr' } }),
      tailwindcss(),
      tanstackStart({
        srcDirectory: 'src',
        router: { routesDirectory: 'app' },
      }),
      sitemap({
        hostname: 'https://cyneteastafrica.com',
        outDir: 'dist/client',
        dynamicRoutes: [
          '/',
          '/courses',
          '/about',
          '/our-gallery',
          '/accreditation',
          '/our-clients',
          '/contact',
          '/terms-and-conditions',
          ...courseRoutes,
          ...categoryRoutes,
        ],
      }),
      react(),
    ],
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
    },
  }
})
