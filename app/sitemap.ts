import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'

const baseUrl = 'https://www.mortgagestevie.com'

// Slugs that have 301/308 redirects — excluded from sitemap
const REDIRECTED_BLOG_SLUGS = new Set([
  'va-loans-longview-tx',
  'va-loans-windsor-co',
  'va-loans-timnath-co',
  'va-loans-fort-collins-co',
  'va-loan-fort-collins-loveland-veterans',
  'va-loan-northern-colorado-veterans-guide',
  'va-loan-windsor-severance-co',
  'va-loans-gilmer-tx',
  'va-loans-gladewater-tx',
])

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/find-my-loan`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/resources`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/resources/rates`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/resources/mortgage-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/resources/dti-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/resources/qualification-estimator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    // Who I Help
    { url: `${baseUrl}/who-i-help`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/who-i-help/medical-professionals`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/who-i-help/investors`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/who-i-help/veterans`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/who-i-help/first-time`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/who-i-help/homeowners`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    // Loan pages — specialty first
    { url: `${baseUrl}/loans`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/loans/doctor-loan`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/loans/investor-line-of-credit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/loans/fix-and-flip`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/loans/dscr`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/loans/conventional`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/loans/fha`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/loans/jumbo`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/loans/usda`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/loans/refinance`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/loans/heloc`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/loans/bank-statement`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/loans/bridge-construction`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    // Resources
    { url: `${baseUrl}/resources/loan-checklists`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  const blogPages: MetadataRoute.Sitemap = posts
    .filter((post) => !REDIRECTED_BLOG_SLUGS.has(post.slug))
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  return [...staticPages, ...blogPages]
}
