import type { Metadata } from 'next'
import Link from 'next/link'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'Active Lifestyle, Stevie De Gala',
  description: 'Ironman triathlon finisher, road cyclist, and pickleball player. Staying active is how I stay sharp.',
}

const activities = [
  {
    label: 'Triathlon',
    title: 'Ironman Finisher',
    body: 'Finishing an Ironman is not about speed. It is about not stopping. The swim, the bike, the run — each one tries to convince you to quit. The discipline it takes to stay in that race is the same discipline I bring to every client\'s process.',
  },
  {
    label: 'Cycling',
    title: 'Road Cycling',
    body: 'On weekends I am usually on my road bike, either riding out to Horsetooth Reservoir in Fort Collins or making the drive down to Chatfield State Park south of Denver to ride with my uncle. There is nothing that clears your head like a long climb.',
  },
  {
    label: 'Pickleball',
    title: 'The Pickler, Fort Collins',
    body: 'I play pickleball at The Pickler in Fort Collins as much as I can. Fast, competitive, and social. If you play and you are ever in Fort Collins, let me know.',
  },
]

export default function ActivePage() {
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
            Staying active is how I stay sharp.
          </h1>
          <p className="text-[#C4C4C4] text-xl leading-relaxed">
            I finished an Ironman triathlon. I play pickleball at The Pickler in Fort Collins as much as I can. Staying active is not a hobby for me. Staying active is how I stay sharp.
          </p>
        </div>
      </section>

      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-px bg-[#2E2E2E]">
            {activities.map((item) => (
              <div key={item.title} className="bg-[#111111] p-10">
                <p className="text-[#888888] text-xs uppercase tracking-widest mb-4">{item.label}</p>
                <h2
                  className="text-2xl text-[#F8F8F8] mb-5"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {item.title}
                </h2>
                <p className="text-[#C4C4C4] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#C4C4C4] text-lg leading-relaxed mb-10">
            Whether you want to talk financing or compare pickleball notes, I am easy to reach.
          </p>
          <BookCallButton variant="outline" label="Get in Touch" />
        </div>
      </section>
    </main>
  )
}
