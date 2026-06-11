import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'Lifestyle, Food, and Local Guides, Stevie De Gala',
  description: 'Filipino recipes, restaurant guides for East Texas, Fort Collins, Denver, and Utah, and life outside the office.',
}

const cards = [
  {
    href: '/lifestyle/recipes',
    label: 'Food',
    headline: 'Family Recipes',
    body: 'Filipino dishes passed down through my dad\'s side. Cooked at every gathering, eaten at every celebration. Filipino food is generous food — make extra, always.',
  },
  {
    href: '/lifestyle/restaurants',
    label: 'Local Guides',
    headline: 'Restaurant Guides',
    body: 'My favorite spots in East Texas, Fort Collins, Denver, and Utah. These are not lists pulled from a search engine. These are the places I actually go back to.',
  },
  {
    href: '/lifestyle/active',
    label: 'Movement',
    headline: 'Active Lifestyle',
    body: 'Ironman triathlon finisher. Road cycling at Horsetooth Reservoir and Chatfield State Park. Pickleball at The Pickler. Staying active is how I stay sharp.',
  },
]

export default function LifestylePage() {
  return (
    <main className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="bg-[#0A0A0A] py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#F8F8F8] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Food, movement, and the people who make life worth living.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed">
            I grew up in a house of chefs. My dad&apos;s Filipino side made every vacation, every event, and every ordinary Tuesday about the food. That love never left me.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-px bg-[#2E2E2E]">
            {cards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group bg-[#111111] p-10 flex flex-col justify-between min-h-[280px] hover:bg-[#1A1A1A] transition-colors"
              >
                <div>
                  <p className="text-[#888888] text-xs uppercase tracking-widest mb-3">{card.label}</p>
                  <h2
                    className="text-2xl text-[#F8F8F8] mb-5 leading-snug"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {card.headline}
                  </h2>
                  <p className="text-[#888888] text-sm leading-relaxed">{card.body}</p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-[#888888] group-hover:text-[#F8F8F8] transition-colors text-sm">
                  Explore
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#C4C4C4] text-lg leading-relaxed mb-10">
            If you are ever in East Texas, Fort Collins, or Salt Lake City, let me know. I will point you somewhere worth going, and if the timing works, I will meet you there.
          </p>
          <BookCallButton variant="outline" label="Get in Touch" />
        </div>
      </section>
    </main>
  )
}
