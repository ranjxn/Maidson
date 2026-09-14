import React, { useEffect } from 'react';

export default function SEO({
  title = 'Maidson & Co. | Minimalist Luxury E-Commerce',
  description = 'Explore Maidson & Co., the minimalist e-commerce store offering timeless luxury clothing, footwear, leather bags, electronics, and accessories.',
  ogImage = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
  ogUrl = typeof window !== 'undefined' ? window.location.href : 'https://maidson.com',
  productData = null
}) {
  const fullTitle = title.includes('Maidson & Co.') ? title : `${title} | Maidson & Co.`;

  useEffect(() => {
    // Update Document Title
    document.title = fullTitle;

    // Helper to set or update meta tags
    const setMetaTag = (selector, attribute, value) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        const [attrName] = selector.replace(/[[\]]/g, '').split('=');
        element.setAttribute(attrName, attribute);
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    // Standard Meta
    setMetaTag('meta[name="description"]', 'description', description);

    // Open Graph
    setMetaTag('meta[property="og:title"]', 'og:title', fullTitle);
    setMetaTag('meta[property="og:description"]', 'og:description', description);
    setMetaTag('meta[property="og:image"]', 'og:image', ogImage);
    setMetaTag('meta[property="og:url"]', 'og:url', ogUrl);
    setMetaTag('meta[property="og:type"]', 'og:type', productData ? 'product' : 'website');

    // Twitter Cards
    setMetaTag('meta[name="twitter:card"]', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'twitter:title', fullTitle);
    setMetaTag('meta[name="twitter:description"]', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'twitter:image', ogImage);

    // Structured JSON-LD Data for Products
    let scriptTag = document.querySelector('script[id="json-ld-product"]');
    if (productData) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        scriptTag.setAttribute('id', 'json-ld-product');
        document.head.appendChild(scriptTag);
      }
      const schema = {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        name: productData.name,
        image: [productData.image],
        description: productData.description,
        sku: `MS-${productData.id}`,
        offers: {
          '@type': 'Offer',
          url: ogUrl,
          priceCurrency: 'USD',
          price: productData.price,
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: productData.rating,
          reviewCount: productData.reviews || 25
        }
      };
      scriptTag.textContent = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [fullTitle, description, ogImage, ogUrl, productData]);

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
