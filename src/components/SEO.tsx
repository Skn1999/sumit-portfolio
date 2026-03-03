import { Helmet } from "react-helmet-async";

/** Site-wide defaults — keep in sync with index.html fallback tags. */
const SITE_NAME = "Sumit Knayyar";
const DEFAULT_TITLE = "Sumit Knayyar — Engineer & Designer";
const DEFAULT_DESCRIPTION =
  "Full-stack Engineer & UX Designer with 4+ years of experience crafting delightful digital experiences. Masters in Human-Computer Interaction.";
const DEFAULT_OG_IMAGE = "/og-default.png"; // place a real OG image in public/

export interface SEOProps {
  /** Page title – will be appended with " | Sumit Knayyar" unless `rawTitle` is true */
  title?: string;
  /** Use the title exactly as-is without appending the site name */
  rawTitle?: boolean;
  description?: string;
  /** Canonical URL path, e.g. "/projects/my-project" */
  path?: string;
  /** Absolute or root-relative URL to an OG image */
  ogImage?: string;
  /** og:type – defaults to "website" */
  type?: string;
  /** Additional keywords for the keywords meta tag */
  keywords?: string[];
  /** Publish date (ISO string) — used for article tags */
  publishedDate?: string;
  /** Author override */
  author?: string;
}

/**
 * Reusable `<head>` manager. Drop into any page component to set
 * title, description, Open Graph, Twitter Card, and other meta tags.
 *
 * ```tsx
 * <SEO title="My Page" description="..." />
 * ```
 */
const SEO: React.FC<SEOProps> = ({
  title,
  rawTitle = false,
  description = DEFAULT_DESCRIPTION,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  type = "website",
  keywords = [],
  publishedDate,
  author = SITE_NAME,
}) => {
  const computedTitle = title
    ? rawTitle
      ? title
      : `${title} | ${SITE_NAME}`
    : DEFAULT_TITLE;

  return (
    <Helmet>
      {/* Core */}
      <title>{computedTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <meta name="author" content={author} />

      {/* Canonical */}
      {path && <link rel="canonical" href={path} />}

      {/* Open Graph */}
      <meta property="og:title" content={computedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      {path && <meta property="og:url" content={path} />}

      {/* Article-specific OG tags */}
      {publishedDate && (
        <meta property="article:published_time" content={publishedDate} />
      )}
      {publishedDate && <meta property="article:author" content={author} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={computedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
