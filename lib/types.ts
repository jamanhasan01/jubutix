export type BlogSEO = {
  metaTitle?: string
  metaDescription?: string
  // metaAuthor?: string
}

export type BlogPost = {
  _id: string
  title: string
  slug: string
  coverImage: string
  category?: string
  tags?: string[]
  content: string
  seo?: BlogSEO
  createdAt: string
  updatedAt: string
}
