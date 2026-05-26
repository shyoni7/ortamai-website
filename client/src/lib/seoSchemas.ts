/**
 * JSON-LD Structured Data schemas for ortamai.com
 * Used by the SEO component to inject rich results into Google Search.
 */

const BASE_URL = 'https://ortamai.com';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ORTAM AI',
  alternateName: 'אורטם AI',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    'ORTAM AI — המרכז לפיתוח AI בישראל. חממה טכנולוגית, קורסי AI לארגונים ועסקים, ומרכז השמה מוכוון AI.',
  foundingDate: '2023',
  areaServed: 'IL',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+972-52-338-1822',
    contactType: 'customer service',
    email: 'info@ortamai.com',
    availableLanguage: ['Hebrew', 'English'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'רחוב אילת 26',
    addressLocality: 'תל אביב-יפו',
    addressCountry: 'IL',
  },
  sameAs: [
    'https://www.linkedin.com/company/ortamai',
    'https://www.facebook.com/ortamai',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ORTAM AI',
  url: BASE_URL,
  inLanguage: ['he', 'en'],
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export const incubatorServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'אקסלרטור AI ליזמים ועסקים',
  alternateName: 'AI Accelerator for Startups & Businesses',
  description:
    'אבחון עסקי, פיילוטים מהירים, בניית מוצרים מבוססי AI וליווי מקצועי עד יישום.',
  provider: {
    '@type': 'Organization',
    name: 'ORTAM AI',
    url: BASE_URL,
  },
  serviceType: 'AI Business Acceleration',
  areaServed: 'IL',
  url: `${BASE_URL}/incubator`,
};

export const academyServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'מרכז הכשרות ORTAM AI',
  alternateName: 'ORTAM AI Academy',
  description:
    'קורסי AI מעשיים לארגונים, מנהלים, מורים ועובדים. הכשרת AI לעולם העבודה החדש.',
  url: `${BASE_URL}/academy`,
  provider: {
    '@type': 'Organization',
    name: 'ORTAM AI',
    url: BASE_URL,
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'קורסי AI',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Course',
          name: 'AI לארגונים ומנהלים',
          description: 'הכשרת AI מעשית למנהלים ועובדים בארגונים.',
          provider: { '@type': 'Organization', name: 'ORTAM AI' },
          educationalLevel: 'Beginner to Intermediate',
          inLanguage: 'he',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Course',
          name: 'AI למורים ובתי ספר',
          description: 'קורס AI לצוותי הוראה — מאושר משרד החינוך.',
          provider: { '@type': 'Organization', name: 'ORTAM AI' },
          educationalLevel: 'Beginner',
          inLanguage: 'he',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Course',
          name: 'AI לשיווק ומכירות',
          description: 'שימוש ב-AI לשיפור קמפיינים, תוכן ומכירות.',
          provider: { '@type': 'Organization', name: 'ORTAM AI' },
          educationalLevel: 'Beginner to Intermediate',
          inLanguage: 'he',
        },
      },
    ],
  },
};

export const placementServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'מרכז השמה מוכוון AI',
  alternateName: 'AI-Driven Placement Center',
  description:
    'מציאת עבודה למועמדים שעברו הכשרת AI, וחיבור בין ארגונים לעובדים בעידן AI.',
  provider: {
    '@type': 'Organization',
    name: 'ORTAM AI',
    url: BASE_URL,
  },
  serviceType: 'Employment Agency',
  areaServed: 'IL',
  url: `${BASE_URL}/placement`,
};

export const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'צור קשר — ORTAM AI',
  url: `${BASE_URL}/contact`,
  mainEntity: {
    '@type': 'Organization',
    name: 'ORTAM AI',
    telephone: '+972-52-338-1822',
    email: 'info@ortamai.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'רחוב אילת 26',
      addressLocality: 'תל אביב-יפו',
      addressCountry: 'IL',
    },
  },
};
