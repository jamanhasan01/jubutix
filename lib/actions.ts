"use server";

import { Blog } from "@/models/Blog";
import slugify from "slugify";
import  connectDB  from "./dbConnect";
import type { BlogPost } from "./types"; // Assuming types are in './types'

// Type for creating a new post (omits DB-generated fields like _id)
type CreateBlogData = Omit<BlogPost, '_id' | 'createdAt' | 'updatedAt'>;

// Type for updating a post (makes all fields optional for patching)
type UpdateBlogData = Partial<CreateBlogData>;


// Create a new blog post
export async function createBlog(data: CreateBlogData) {
  await connectDB();
  const slug = data.slug || slugify(data.title, { lower: true, strict: true });
  const newBlog = await Blog.create({ ...data, slug });
  return JSON.parse(JSON.stringify(newBlog)) as BlogPost;
}

// Update an existing blog post
export async function updateBlog(id: string, patch: UpdateBlogData) {
  await connectDB();
  const updatedBlog = await Blog.findByIdAndUpdate(id, patch, {
    new: true,
  });
  return JSON.parse(JSON.stringify(updatedBlog)) as BlogPost;
}