import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'Restaurant Guides, Stevie De Gala',
  description: 'My favorite restaurants in East Texas, Fort Collins, Denver, and Utah. Places I actually go back to.',
}

const regions = [
  {
    name: 'East Texas',
    intro: 'Gilmer is a small town but the food scene runs deep if you know where to look. Growing up here means I know every BBQ pit, every diner, and every hidden gem worth driving to.',
    placeholder: 'Stevie will be adding East Texas restaurant picks here.',
  },
  {
    name: 'Northern Colorado — Fort Collins and Denver',
    intro: 'Fort Collins has quietly become one of the best food cities in Colorado. Add a drive down to Denver and you have access to some of the most interesting dining in the Mountain West. These are the places I keep going back to.',
    placeholder: 'Stevie will be adding Fort Collins and Denver restaurant picks here.',
  },
  {
    name: 'Utah — Utah County and Salt Lake City',
    intro: "Salt Lake City's food scene has transformed over the last decade. Utah County has its own gems worth knowing. I grew up eating here and I still make a point to visit my favorites every time I am back.",
    placeholder: 'Stevie will be adding Utah restaurant picks here.',
  },
]

export default function RestaurantsPage() {
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
            Restaurant Guides
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed">
            I have spent real time in each of these places. These are not lists pulled from a search engine. These are the spots I actually go back to.
          </p>
        </div>
      </section>

      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          {regions.map((region) => (
            <div key={region.name}>
              <h2
                className="text-2xl md:text-3xl text-[#F8F8F8] mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {region.name}
              </h2>
              <p className="text-[#C4C4C4] leading-relaxed mb-8 max-w-2xl">{region.intro}</p>
              <div className="border border-[#2E2E2E] bg-[#0A0A0A] p-6">
                <p className="text-[#888888] text-sm">{region.placeholder}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#C4C4C4] text-lg leading-relaxed mb-10">
            If you are ever in East Texas, Fort Collins, or Salt Lake City, let me know. I will point you somewhere worth going.
          </p>
          <BookCallButton variant="outline" label="Get in Touch" />
        </div>
      </section>
    </main>
  )
}
