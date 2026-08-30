import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import BookCallButton from '@/components/BookCallButton'
import PDFViewer from '@/components/PDFViewer'

export const metadata: Metadata = {
  title: 'Blog — Physician Loans, VA Loans & Northern Colorado Mortgage Insights | Stevie de Gala',
  description:
    'Mortgage education for medical professionals, veterans, and real estate investors in Northern Colorado. Physician loan guides, VA loan breakdowns, market updates for Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance.',
}

const pdfResources = [
  {
    title: "Mortgage Stevie's Weekly Update — Northern Colorado",
    excerpt: "The latest mortgage market update for Northern Colorado. Rates, trends, and what to watch this week in Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance.",
    file: "/Mortgage Stevie's Weekly Update NOCO.pdf",
    label: 'Northern Colorado',
    date: 'June 30, 2025',
  },
  {
    title: "Mortgage Stevie's Weekly Update — East Texas",
    excerpt: "The latest mortgage market update for East Texas. Rates, trends, and what to watch this week.",
    file: "/Mortgage Stevie's Weekly Update ETX.pdf",
    label: 'East Texas',
    date: 'June 30, 2025',
  },
]

const topics = [
  {
    label: 'Physician Loans',
    description: 'Low down, no PMI, student debt excluded.',
    href: '/who-i-help/medical-professionals',
  },
  {
    label: 'VA Loans',
    description: 'Zero down, no PMI, earned benefits.',
    href: '/who-i-help/veterans',
  },
  {
    label: 'Northern Colorado Markets',
    description: 'Fort Collins, Greeley, Loveland, Timnath, Windsor & Severance.',
    href: '/who-i-help',
  },
  {
    label: 'Real Estate Investing',
    description: 'DSCR loans, portfolio strategy, and creative structures.',
    href: '/who-i-help/investors',
  },
]

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="pt-16 md:pt-20 min-h-screen bg-[#0A0A0A]">

      {/* Header */}
      <section className="py-16 md:py-24 px-6 border-b border-[#2E2E2E]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="text-[#888888] text-xs uppercase tracking-[0.2em] mb-4">Northern Colorado</p>
            <h1
              className="text-4xl md:text-5xl text-[#F8F8F8] leading-tight mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Insights &amp; Education
            </h1>
            <p className="text-[#888888] text-base leading-relaxed max-w-xl">
              Mortgage guides for medical professionals, veterans, and investors — focused on Northern Colorado and the loan programs that matter most to each group.
            </p>
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

      {/* Topic Navigation */}
      <section className="border-b border-[#2E2E2E] py-10 px-6 bg-[#111111]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-6">Browse by Topic</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {topics.map((topic) => (
              <Link
                key={topic.label}
                href={topic.href}
                className="group border border-[#2E2E2E] bg-[#0A0A0A] hover:border-[#555555] hover:bg-[#1A1A1A] transition-all px-5 py-4 rounded-xl"
              >
                <p className="text-[#F8F8F8] text-sm font-medium mb-1 group-hover:text-white transition-colors">
                  {topic.label}
                </p>
                <p className="text-[#555555] text-xs leading-relaxed group-hover:text-[#888888] transition-colors">
                  {topic.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Posts + PDFs */}
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
