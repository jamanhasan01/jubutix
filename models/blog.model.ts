import { Schema, model, models } from 'mongoose'
const seoSchema = new Schema(
  {
    metaTitle: {
      type: String,
      required: [true, 'Meta title is required'],
    },
    metaDescription: {
      type: String,
      required: [true, 'Meta description is required'],
    },
  },
  { _id: false }
)

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required.'],
    },
    slug: {
      type: String,
      required: [true, 'URL slug is required.'],
      unique: true,
    },
    excerpt: String,
    coverImage: {
      type: String,
      required: [true, 'Cover image is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    tags: [String],
    content: {
      type: String,
      required: [true, 'Blog content cannot be empty.'],
    },
    seo: seoSchema,
    user: {
      type: Schema.Types.ObjectId,
      ref:'User',
      required: [true, 'Author is required'],
    },
  },
  { timestamps: true }
)

export const Blog = models.Blog || model('Blog', blogSchema)
