import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  /** Canonical path, e.g. "/academy". Defaults to current pathname. */
  canonical?: string;
  /** JSON-LD structured data object(s). Pass an array for multiple schemas. */
  schema?: object | object[];
  /** noindex — set true for pages that should not appear in search results */
  noIndex?: boolean;
  /** Share image: a path on this site (e.g. "/images/og/x.jpg") or a full URL */
  ogImage?: string;
}

const SITE_NAME = 'ORTAM AI';
const BASE_URL = 'https://ortamai.com';
/** 1200 x 630 share card, served from this site so link previews can fetch it. */
const DEFAULT_OG_IMAGE = '/images/og/default.jpg';

export default function SEO({
  title,
  description,
  canonical,
  schema,
  noIndex = false,
  ogImage = DEFAULT_OG_IMAGE,
}: SEOProps) {
  // Some pages already name the brand in their title; do not say it twice.
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`;

  const schemas = schema
    ? Array.isArray(schema)
      ? schema
      : [schema]
    : [];

  return (
    <Helmet>
      {/* Primary */}
      <html lang="he" dir="rtl" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="he_IL" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* JSON-LD Structured Data */}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
