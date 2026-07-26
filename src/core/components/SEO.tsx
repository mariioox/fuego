import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
}

const SITE_NAME = "Fuego Archive";
const DEFAULT_IMAGE = "/fuego_logo.jpeg";
const SITE_URL = "https://feugo-heat.vercel.app";
const TW_HANDLE = "@fuego_heatng";

export default function SEO({
  title,
  description,
  image = DEFAULT_IMAGE,
  url = SITE_URL,
  type = "website",
}: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const absoluteImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="theme-color" content="#fd6200" />
      <link rel="canonical" href={url} />

      {/* Open Graph — Facebook, Instagram, TikTok, LinkedIn, WhatsApp */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_NG" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TW_HANDLE} />
      <meta name="twitter:creator" content={TW_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:image:alt" content={description} />

      {/* TikTok reads OG tags — no separate TikTok meta needed */}
      {/* Additional social discoverability */}
      <meta name="author" content={SITE_NAME} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
    </Helmet>
  );
}
