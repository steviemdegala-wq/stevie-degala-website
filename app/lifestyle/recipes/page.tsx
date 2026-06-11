import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'Family Recipes, Stevie De Gala',
  description: 'Filipino family recipes passed down from my dad\'s side. Dishes cooked at every gathering and every celebration.',
}

export default function RecipesPage() {
  return (
    <main className="pt-16 md:pt-20">
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/lifestyle" className="text-[#888888] text-xs uppercase tracking-widest hover:text-[#F8F8F8] transition-colors flex items-center gap-2 mb-10">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Lifestyle
          </Link>
          <h1
            className="text-4xl md:text-5xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Family Recipes
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed">
            My dad is Filipino and food is everything on that side of the family. Growing up I was his sous chef, standing next to him in the kitchen learning things that no recipe book ever fully captures. Every dish tells a story about where we come from and who we are.
          </p>
        </div>
      </section>

      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#C4C4C4] text-lg leading-relaxed mb-12 max-w-2xl">
            These are the recipes that have been passed down, cooked at every gathering, and eaten at every celebration. Filipino food is generous food. Make extra, always.
          </p>

          {/* Placeholder grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border border-[#2E2E2E] bg-[#0A0A0A] p-8 min-h-[200px] flex flex-col justify-between">
                <div>
                  <p className="text-[#888888] text-xs uppercase tracking-widest mb-3">Recipe</p>
                  <p
                    className="text-[#2E2E2E] text-xl"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Coming soon
                  </p>
                </div>
                <p className="text-[#888888] text-xs mt-6">Stevie will be adding family recipes here.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#C4C4C4] text-lg leading-relaxed mb-10">
            Have a financing question while you cook? I am always happy to talk.
          </p>
          <BookCallButton variant="outline" label="Get in Touch" />
        </div>
      </section>
    </main>
  )
}
