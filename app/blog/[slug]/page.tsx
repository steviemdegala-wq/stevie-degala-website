import type { Metadata } from 'next'
import Link from 'next/link'
import { marked } from 'marked'
import { getAllPosts, getPost } from '@/lib/posts'
import BookCallButton from '@/components/BookCallButton'

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} — Stevie de Gala`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} — Stevie de Gala`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Stevie de Gala'],
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) return null

  const html = marked.parse(post.content) as string

  const baseUrl = 'https://mortgagestevie.com'

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    url: `${baseUrl}/blog/${post.slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${baseUrl}/blog/${post.slug}` },
    author: {
      '@type': 'Person',
      name: 'Stevie de Gala',
      url: `${baseUrl}/about`,
      hasCredential: 'NMLS# 2845865',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Stevie de Gala — Medical Professional Loan Consultant',
      url: baseUrl,
      logo: { '@type': 'ImageObject', url: `${baseUrl}/opengraph-image` },
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${baseUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${baseUrl}/blog/${post.slug}` },
    ],
  }

  return (
    <main className="pt-16 md:pt-20 min-h-screen bg-[#0A0A0A]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Header */}
      <section className="py-16 md:py-24 px-6 border-b border-[#2E2E2E]">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#888888] text-xs uppercase tracking-widest hover:text-[#F8F8F8] transition-colors mb-8"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Blog
          </Link>
          <p className="text-[#888888] text-xs uppercase tracking-widest mb-4">
            {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <h1 className="text-4xl md:text-5xl text-[#F8F8F8] leading-tight font-semibold">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 px-6 pb-24 bg-white">
        <div className="max-w-3xl mx-auto">
          <div
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#111111] border-t border-[#2E2E2E] py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl text-[#F8F8F8] mb-3 font-semibold">
            Have questions about your situation?
          </h2>
          <p className="text-[#888888] text-sm leading-relaxed mb-8 max-w-md mx-auto">
            Book a free 15-minute call and I will give you a straight answer.
          </p>
          <BookCallButton variant="solid" label="Book a Free Call" />
        </div>
      </section>
    </main>
  )
}
