import { Schema, model, models } from "mongoose";

const seoSchema = new Schema({
  metaTitle: String,
  metaDescription: String,
  metaAuthor: String,
  ogImage: String,
  twitterCard: { type: String, default: "summary_large_image" },
  canonicalUrl: String,
  faqJsonLd: String,
}, { _id: false });

const blogSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: String,
  coverImage: String,
  category: String,
  tags: [String],
  content: { type: String, required: true },
  seo: seoSchema,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Blog = models.Blog || model("Blog", blogSchema);
