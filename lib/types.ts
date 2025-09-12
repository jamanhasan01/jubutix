export type BlogSEO = {
  metaTitle?: string;
  metaDescription?: string;
  metaAuthor?: string;
  ogImage?: string;
  twitterCard?: "summary" | "summary_large_image";
  canonicalUrl?: string;
  faqJsonLd?: string; // optional JSON-LD for FAQ
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  category?: string;
  tags?: string[];
  content: string;
  seo?: BlogSEO;
  createdAt: string;
  updatedAt: string;
};
