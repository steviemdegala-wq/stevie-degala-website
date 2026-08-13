import type { Metadata } from 'next'
import Image from 'next/image'
import BookCallButton from '@/components/BookCallButton'

export const metadata: Metadata = {
  title: 'About Stevie de Gala | Northern Colorado Medical Professional Loan Consultant',
  description:
    "I specialize in physician loans and VA loans because both are personal. My dad was on dialysis for eight years. My grandfather earned his U.S. citizenship after serving in WWII. This work is not a niche strategy — it is a way to give back. NMLS# 2845865",
  openGraph: {
    title: 'About Stevie de Gala | NMLS# 2845865 | Northern Colorado Mortgage Broker',
    description: 'Physician loan and VA loan specialist in Timnath, CO. NMLS# 2845865. Licensed in Colorado and Texas.',
    type: 'profile',
  },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Stevie de Gala',
  url: 'https://mortgagestevie.com/about',
  image: 'https://mortgagestevie.com/headshot.jpg',
  jobTitle: 'Mortgage Broker',
  description:
    'Licensed mortgage broker specializing in physician loans and VA loans in Northern Colorado. Based in Timnath, CO. NMLS# 2845865.',
  telephone: '+18065082666',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Timnath',
    addressRegion: 'CO',
    postalCode: '80547',
    addressCountry: 'US',
  },
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'license',
    name: 'NMLS# 2845865',
    recognizedBy: {
      '@type': 'Organization',
      name: 'Nationwide Multistate Licensing System (NMLS)',
      url: 'https://www.nmlsconsumeraccess.org',
    },
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Brigham Young University',
    sameAs: 'https://www.byu.edu',
  },
  knowsAbout: [
    'Physician Loans', 'VA Loans', 'FHA Loans', 'Conventional Loans', 'Jumbo Loans',
    'DSCR Loans', 'Bank Statement Loans', 'HELOC', 'Mortgage Refinance',
    'Northern Colorado Real Estate', 'Medical Professional Home Financing',
    'Investor Real Estate Financing', 'Debt-to-Income Ratio', 'Student Loan Treatment in Mortgages',
  ],
  areaServed: [
    'Fort Collins, CO', 'Greeley, CO', 'Loveland, CO', 'Timnath, CO',
    'Windsor, CO', 'Severance, CO', 'Gilmer, TX', 'Longview, TX',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'NEXA Mortgage',
  },
  sameAs: ['https://mortgagestevie.com'],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mortgagestevie.com' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://mortgagestevie.com/about' },
  ],
}

const timeline = [
  { label: 'Heritage', content: 'Grandfather served in guerrilla warfare in WWII in the Philippines. Earned U.S. citizenship after the war.' },
  { label: 'East Texas', content: 'Grew up in Gilmer, TX. Family dealership, lawn mowing, snack box hustle.' },
  { label: 'High School', content: "Dad battled polycystic kidney disease — over eight years on dialysis before his transplant. Family relocated for his care. Those years changed everything." },
  { label: 'Mission', content: 'Church mission in Mexico.' },
  { label: 'BYU', content: 'Entrepreneurial Management degree, Brigham Young University.' },
  { label: 'Capstone', content: 'Ground-up self-storage development, Gilmer, TX — senior year.' },
  { label: 'After School', content: 'Commercial real estate AI underwriting software company.' },
  { label: 'Now', content: 'Licensed mortgage broker specializing in physician loans and VA loans in Northern Colorado. NMLS# 2845865' },
]

const regions = [
  {
    title: 'Northern Colorado — Home Base',
    body: "My wife is from Fort Collins, and we are based in Timnath. Northern Colorado is not a market I flew into — it is where I live, ride, and know the neighborhoods. My primary focus is Fort Collins, Greeley, Loveland, Timnath, Windsor, and Severance. If you are in Northern Colorado, you are working with someone who is genuinely part of this community.",
  },
  {
    title: 'East Texas — Secondary Market',
    body: "Gilmer is home. I grew up here, built my senior capstone project here, and my roots run deep. I am also licensed in Texas and can help clients in the East Texas market — Gilmer, Longview, and Tyler. But Northern Colorado is where I am building, and it is where the majority of my work is focused.",
  },
]

export default function AboutPage() {
  return (
    <main className="pt-16 md:pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="bg-[#0A0A0A] py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Photo */}
            <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', maxWidth: '420px' }}>
              <Image
                src="/headshot.jpg"
                alt="Stevie de Gala — physician loan consultant, Northern Colorado"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover object-top grayscale"
                quality={90}
                priority
              />
            </div>

            {/* Text */}
            <div>
              <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-5">Northern Colorado</p>
              <h1
                className="text-5xl md:text-6xl text-[#F8F8F8] mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                I&apos;m Stevie.
              </h1>
              <p className="text-[#C4C4C4] text-xl leading-relaxed mb-5">
                Mortgage consultant, real estate investor, Ironman finisher, Filipino cook, and a person who genuinely loves helping people win.
              </p>
              <p className="text-[#888888] text-base leading-relaxed">
                I specialize in physician loans and VA loans. Both are personal to me in ways that have nothing to do with business strategy — and everything to do with the people who shaped my life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why These Clients */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#888888] text-xs uppercase tracking-[0.25em] mb-10">Why I Do This Work</p>
          <div className="grid md:grid-cols-2 gap-12">

            {/* Medical Professionals */}
            <div>
              <h2
                className="text-2xl md:text-3xl text-[#F8F8F8] leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Why I specialize in medical professionals.
              </h2>
              <div className="space-y-5 text-[#C4C4C4] text-base leading-relaxed">
                <p>
                  My dad was on dialysis for over eight years. Polycystic kidney disease, and a list of health complications that came with it. I was young, but I remember those appointments clearly — the drives, the waiting rooms, the people who cared for him. The doctors who explained things patiently. The nurses who knew his name. The technicians who showed up without fail.
                </p>
                <p>
                  They were not just doing a job. They were keeping my dad alive.
                </p>
                <p>
                  Our family eventually relocated so he could access the care he needed for his transplant. That season taught me more about sacrifice, resilience, and the value of skilled people in healthcare than anything else in my life.
                </p>
                <p className="text-[#888888]">
                  When I work on physician loans, it is not because it is a profitable niche. It is because I want to do something meaningful for the people who did something profound for my family.
                </p>
              </div>
            </div>

            {/* Veterans */}
            <div>
              <h2
                className="text-2xl md:text-3xl text-[#F8F8F8] leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Why I specialize in veterans.
              </h2>
              <div className="space-y-5 text-[#C4C4C4] text-base leading-relaxed">
                <p>
                  My grandfather came from the Philippines and joined the U.S. Army. He served in guerrilla warfare in World War II — and after the war, he earned his U.S. citizenship. That document meant something entirely different to him than it does to people who were born with it. He chose this country, and then he fought for it.
                </p>
                <p>
                  Several of my cousins have served since then. I grew up understanding that freedom is not abstract. It is paid for by real people who choose to stand between us and danger.
                </p>
                <p className="text-[#888888]">
                  When I work with veterans on VA loans, I am not processing a transaction. I am trying to give something back — to a group that already gave far more than most people ever will.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="bg-[#0A0A0A] py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-10"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Where I Come From
          </h2>
          {[
            "Gilmer, Texas shaped me. Growing up in a small East Texas town meant growing up surrounded by family, and family meant work. My dad and grandfather ran HM Dodd Motor Company, and I spent as much time there as I could. Before I was old enough to drive, I was mowing lawns and running a snack box route to local salons. Gilmer taught me that you earn what you get.",
            "In high school, my family relocated so my dad could receive a kidney transplant. He had been on dialysis for eight years — polycystic kidney disease, and everything that came with it. I watched my parents navigate that with grace, and I watched the people who cared for him do their jobs with a level of dedication I have never forgotten. After high school, I served a church mission in Mexico. Those years changed how I see people and how I show up for them.",
            "At Brigham Young University, I studied Entrepreneurial Management. My senior capstone was not a paper or a presentation. It was a self-storage facility I developed from the ground up back home in Gilmer, Texas. That project confirmed everything I already believed about real estate.",
            "Since graduating, I have worked in a commercial real estate AI company focused on underwriting and invested in multifamily properties. Now I bring all of that together as a licensed mortgage broker — specializing in the people and the loan programs I care most about.",
          ].map((para, i) => (
            <p key={i} className="text-[#C4C4C4] text-lg leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl text-[#F8F8F8] mb-12"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            The Path
          </h2>
          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#2E2E2E]" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-6 relative">
                  <div className="flex-shrink-0 w-[15px] h-[15px] rounded-full border border-[#888888] bg-[#111111] mt-1 z-10" />
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
      <section className="bg-[#0A0A0A] py-20 px-6">
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
      <section className="bg-[#111111] border-y border-[#2E2E2E] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl md:text-4xl text-[#F8F8F8] mb-12"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Communities I Serve
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {regions.map((region) => (
              <div key={region.title} className="card-hover border border-[#2E2E2E] bg-[#0A0A0A] p-8 rounded-xl">
                <h3
                  className="text-xl text-[#F8F8F8] mb-4"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {region.title}
                </h3>
                <p className="text-[#C4C4C4] text-sm leading-relaxed">{region.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outside of Work */}
      <section className="bg-[#0A0A0A] py-20 px-6">
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
              'Road cycling at Horsetooth Reservoir',
              'Pickleball at The Pickler',
              'Filipino food and family recipes',
              'Family first, always',
              'Monopoly champion (real estate research counts)',
            ].map((item) => (
              <div key={item} className="border border-[#2E2E2E] bg-[#111111] p-4 rounded-xl flex items-center justify-center text-center">
                <p className="text-[#C4C4C4] text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* End CTA */}
      <section className="bg-[#111111] border-t border-[#2E2E2E] py-20 px-6">
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
