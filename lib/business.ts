export const BUSINESS = {
  name: 'Stevie de Gala',
  brand: 'Mortgage Stevie',
  phone: '(970) 415-0539',
  telephone: '+19704150539',
  email: 'SDegala@BarrettFinancial.com',
  url: 'https://mortgagestevie.com',
  googleProfile: 'https://share.google/Ygo7xjFlqCiz80Jkk',
  instagram: 'https://www.instagram.com/mortgage_stevie/',
  facebook: 'https://www.facebook.com/stevie.degala/',
  cities: ['Timnath', 'Fort Collins', 'Windsor', 'Loveland', 'Greeley', 'Severance'],
  hours: 'Monday–Friday, 8 AM–6 PM; Saturday, 9 AM–2 PM; Sunday closed. Mountain Time.',
} as const

export const businessSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${BUSINESS.url}/#business`,
      name: BUSINESS.brand,
      url: BUSINESS.url,
      description: 'Investor-focused mortgage brokerage services based in Timnath and serving Northern Colorado, with medical professional home loans also available.',
      telephone: BUSINESS.telephone,
      email: BUSINESS.email,
      founder: { '@id': `${BUSINESS.url}/#stevie-de-gala` },
      areaServed: BUSINESS.cities.map((name) => ({ '@type': 'City', name: `${name}, Colorado` })),
      sameAs: [BUSINESS.googleProfile, BUSINESS.instagram, BUSINESS.facebook],
    },
    {
      '@type': 'Person',
      '@id': `${BUSINESS.url}/#stevie-de-gala`,
      name: BUSINESS.name,
      url: `${BUSINESS.url}/about`,
      image: `${BUSINESS.url}/headshot.jpg`,
      jobTitle: 'Mortgage Broker',
      telephone: BUSINESS.telephone,
      email: BUSINESS.email,
      hasCredential: { '@type': 'EducationalOccupationalCredential', credentialCategory: 'license', name: 'NMLS# 2845865' },
      worksFor: { '@type': 'Organization', name: 'Barrett Financial', identifier: { '@type': 'PropertyValue', name: 'NMLS', value: '181106' } },
      sameAs: [BUSINESS.googleProfile, BUSINESS.instagram, BUSINESS.facebook, 'https://www.nmlsconsumeraccess.org/EntityDetails.aspx/INDIVIDUAL/2845865'],
    },
  ],
}
