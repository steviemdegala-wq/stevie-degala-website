import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import BookCallButton from '@/components/BookCallButton'
import PDFViewer from '@/components/PDFViewer'

export const metadata: Metadata = {
  title: 'Blog — Stevie De Gala',
  description: 'Mortgage tips, real estate insights, and financial education from Stevie De Gala.',
}

const pdfResources = [
  {
    title: "Mortgage Stevie's Weekly Update — ETX",
    excerpt: "The latest mortgage market update for East Texas. Rates, trends, and what to watch this week.",
    file: "/Mortgage Stevie's Weekly Update ETX.pdf",
    label: 'East Texas',
    date: 'June 30, 2025',
  },
  {
    title: "Mortgage Stevie's Weekly Update — NOCO",
    excerpt: "The latest mortgage market update for Northern Colorado. Rates, trends, and what to watch this week.",
    file: "/Mortgage Stevie's Weekly Update NOCO.pdf",
    label: 'Northern Colorado',
    date: 'June 30, 2025',
  },
]

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="pt-16 md:pt-20 min-h-screen bg-[#0A0A0A]">
      <section className="py-16 md:py-24 px-6 border-b border-[#2E2E2E]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="text-[#888888] text-xs uppercase tracking-[0.2em] mb-4">Blog</p>
            <h1 className="text-4xl md:text-5xl text-[#F8F8F8] leading-tight font-semibold">
              Insights &amp; Education
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <a
              href="https://prod.lendingpad.com/nexa/f4ccb1fc-693a-4398-9bc4-77bbd6cdc8c8/pos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 text-sm uppercase tracking-widest font-medium transition-all rounded-full bg-[#F8F8F8] text-[#0A0A0A] border border-[#F8F8F8] hover:bg-[#0A0A0A] hover:text-[#F8F8F8]"
            >
              Get Pre-Qualified
            </a>
            <BookCallButton variant="outline" label="Book a Free Call" />
          </div>
        </div>
      </section>

      <section className="py-16 px-6 pb-24">
        <div className="max-w-3xl mx-auto space-y-6">

          <PDFViewer pdfs={pdfResources} />

          {posts.length === 0 ? (
            <p className="text-[#888888]">No posts yet. Check back soon.</p>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="card-white block group border border-[#E5E5E5] bg-white rounded-xl p-8 hover:border-[#999999] transition-all"
                >
                  <p className="text-[#888888] text-xs uppercase tracking-widest mb-3">
                    {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                  <h2 className="text-[#0A0A0A] text-2xl font-semibold mb-3 group-hover:text-[#444444] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-[#555555] text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <span className="text-[#555555] text-sm group-hover:text-[#0A0A0A] transition-colors">
                    Read more →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
