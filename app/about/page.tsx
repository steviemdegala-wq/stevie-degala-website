import type { Metadata } from 'next'
import Image from 'next/image'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'About Stevie De Gala, Mortgage Broker serving East Texas, Fort Collins, and Denver',
  description: "From Gilmer, Texas to Fort Collins, Colorado. I'm a mortgage broker, real estate investor, Ironman finisher, and Filipino cook who genuinely loves helping people win.",
}

const timeline = [
  { label: 'East Texas', content: 'Grew up in Gilmer, TX. Family dealership, lawn mowing, snack box hustle.' },
  { label: 'High School', content: "Family moved to Utah for dad's kidney transplant." },
  { label: 'Mission', content: 'Church mission in Mexico.' },
  { label: 'BYU', content: 'Entrepreneurial Management degree, Brigham Young University.' },
  { label: 'Capstone', content: 'Ground-up self-storage development, Gilmer, TX.' },
  { label: 'After School', content: 'Commercial real estate AI underwriting software company.' },
  { label: 'Now', content: 'Licensed mortgage broker serving TX and CO.' },
]

const regions = [
  {
    title: 'East Texas',
    body: 'Gilmer is home. I grew up here, built here, and my roots run deep in this community. Helping East Texas families in Gilmer, Longview, and Tyler get into their first home or grow a real estate portfolio feels personal because every one of these clients could be a neighbor, a cousin, or a family friend.',
  },
  {
    title: 'Northern Colorado — Fort Collins and Denver',
    body: "My wife is from Fort Collins, and that makes this community family. On weekends you will find me riding out to Horsetooth Reservoir or making the drive down to Chatfield State Park to ride with my uncle. Families and investors across Fort Collins, Loveland, and the greater Denver area get a mortgage broker who is not just licensed here. Northern Colorado is where I live.",
  },
]

export default function AboutPage() {
  return (
    <main className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="bg-[#0A0A0A] py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Photo */}
            <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', maxWidth: '420px' }}>
              <Image
                src="/headshot.jpg"
                alt="Stevie De Gala"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover object-top grayscale"
                quality={90}
                priority
              />
            </div>

            {/* Text */}
            <div>
              <h1
                className="text-5xl md:text-6xl text-[#F8F8F8] mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                I&apos;m Stevie.
              </h1>
              <p className="text-[#C4C4C4] text-xl leading-relaxed">
                Mortgage consultant, real estate investor, pickleball player, triathlete, Filipino cook, and a person who genuinely loves helping people win.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-10"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Where I Come From
          </h2>
          {[
            "Gilmer, Texas shaped me. Growing up in a small East Texas town meant growing up surrounded by family, and family meant work. My dad and grandfather ran HM Dodd Motor Company, and I spent as much time there as I could. Before I was old enough to drive, I was mowing lawns and running a snack box route to local salons. Gilmer taught me that you earn what you get.",
            "In high school, my family moved to Utah so my dad could receive a kidney transplant. That season of life taught me more about sacrifice and resilience than anything else ever has. After high school, I served a church mission in Mexico. Those years changed how I see people and changed how I show up for them.",
            "At Brigham Young University, I studied Entrepreneurial Management. My senior capstone was not a paper or a presentation. My senior capstone was a self-storage facility I developed from the ground up back home in Gilmer, Texas. That project confirmed everything I already believed about real estate.",
            "Since graduating, I have worked in a commercial real estate AI company focused on underwriting and invested in multifamily properties. Now I bring all of that together as a licensed mortgage broker. My clients get someone who has sat on both sides of the table, and who knows exactly what good financing looks like.",
          ].map((para, i) => (
            <p key={i} className="text-[#C4C4C4] text-lg leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl text-[#F8F8F8] mb-12"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            The Path
          </h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#2E2E2E]" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-6 relative">
                  {/* Dot */}
                  <div className="flex-shrink-0 w-[15px] h-[15px] rounded-full border border-[#888888] bg-[#0A0A0A] mt-1 z-10" />
                  <div>
                    <p className="text-[#F8F8F8] font-medium mb-1">{item.label}</p>
                    <p className="text-[#888888] text-sm leading-relaxed">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <blockquote
            className="text-2xl md:text-3xl text-[#F8F8F8] leading-relaxed mb-8 italic"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            &ldquo;Going through the mortgage process myself, the biggest frustration was not the paperwork. The biggest frustration was the silence. Not knowing what was happening, not being able to reach anyone. My practice exists to fix exactly that.&rdquo;
          </blockquote>
          <p className="text-[#C4C4C4] text-lg leading-relaxed">
            As a broker, I am not locked into one lender&apos;s products. I shop the market on your behalf so you get more options, more flexibility, and a real person you can actually call. That combination is rare. You will feel the difference.
          </p>
        </div>
      </section>

      {/* Region Cards */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-12"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Communities I Serve
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {regions.map((region) => (
              <div key={region.title} className="border border-white/40 bg-white backdrop-blur-sm p-8 rounded-xl">
                <h3
                  className="text-xl text-[#0A0A0A] mb-4"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {region.title}
                </h3>
                <p className="text-[#3A3A3A] text-sm leading-relaxed">{region.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outside of Work */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl text-[#F8F8F8] mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Outside the Office
          </h2>
          <p className="text-[#C4C4C4] text-lg leading-relaxed mb-8">
            When I am not working on financing, I am usually cooking something my dad would be proud of or burning off the calories outside.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              'Ironman triathlon finisher',
              'Road cycling at Horsetooth Reservoir and Chatfield State Park',
              'Pickleball at The Pickler',
              'Filipino food and family recipes',
              'Family first, always',
              'Monopoly champion (real estate research counts)',
            ].map((item) => (
              <div key={item} className="border border-white/40 bg-white backdrop-blur-sm p-5 rounded-xl min-h-[120px] flex items-center justify-center text-center">
                <p className="text-[#3A3A3A] text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* End CTA */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            No pressure. No pitch.
          </h2>
          <p className="text-[#C4C4C4] text-lg mb-10 leading-relaxed">
            Just a real conversation about where you are and where you want to go.
          </p>
          <BookCallButton variant="outline" />
        </div>
      </section>
    </main>
  )
}
