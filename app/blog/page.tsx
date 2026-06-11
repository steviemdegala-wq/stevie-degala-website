import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Blog — Stevie De Gala',
  description: 'Mortgage tips, real estate insights, and financial education from Stevie De Gala.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="pt-16 md:pt-20 min-h-screen bg-[#0A0A0A]">
      <section className="py-16 md:py-24 px-6 border-b border-[#2E2E2E]">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-[0.2em] mb-4">Blog</p>
          <h1
            className="text-4xl md:text-5xl text-[#F8F8F8] leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Insights &amp; Education
          </h1>
        </div>
      </section>

      <section className="py-16 px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-[#888888]">No posts yet. Check back soon.</p>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block group border border-[#2E2E2E] bg-[#111111] rounded-xl p-8 hover:border-[#555555] transition-all"
                >
                  <p className="text-[#888888] text-xs uppercase tracking-widest mb-3">{post.date}</p>
                  <h2
                    className="text-[#F8F8F8] text-2xl mb-3 group-hover:text-[#C4C4C4] transition-colors"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-[#888888] text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <span className="text-[#555555] text-sm group-hover:text-[#F8F8F8] transition-colors">
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
