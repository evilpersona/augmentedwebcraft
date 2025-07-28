import React from 'react';

interface SEOMetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterCreator?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  articleSection?: string;
  articleTags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
}

const SEOMetaTags: React.FC<SEOMetaTagsProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  twitterCreator,
  author,
  publishedTime,
  modifiedTime,
  articleSection,
  articleTags,
  noindex = false,
  nofollow = false,
}) => {
  const robots = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
    'max-snippet:-1',
    'max-image-preview:large',
    'max-video-preview:-1'
  ].join(', ');

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': ogType === 'article' ? 'Article' : 'WebPage',
    headline: ogTitle || title,
    description: ogDescription || description,
    ...(ogImage && { image: ogImage }),
    ...(author && { author: { '@type': 'Person', name: author } }),
    ...(publishedTime && { datePublished: publishedTime }),
    ...(modifiedTime && { dateModified: modifiedTime }),
    ...(articleSection && { articleSection }),
    ...(articleTags && { keywords: articleTags.join(', ') }),
    publisher: {
      '@type': 'Organization',
      name: 'Augmented Webcraft',
      logo: {
        '@type': 'ImageObject',
        url: 'https://augmentedwebcraft.com/logo.png',
        width: 200,
        height: 200
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl || typeof window !== 'undefined' ? window.location.href : ''
    }
  };

  return (
    <>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      <meta name="robots" content={robots} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:type" content={ogType} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {ogImage && (
        <>
          <meta property="og:image" content={ogImage} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content={ogTitle || title} />
        </>
      )}
      <meta property="og:site_name" content="Augmented Webcraft" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article-specific Open Graph tags */}
      {ogType === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {articleSection && <meta property="article:section" content={articleSection} />}
          {articleTags && articleTags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
      <meta name="twitter:site" content="@augmentedwebcraft" />
      
      {/* Additional Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#050917" />
      <meta name="msapplication-TileColor" content="#050917" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
    </>
  );
};

export default SEOMetaTags;