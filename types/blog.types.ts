// /types/blog.types.ts
import { ObjectId } from "mongoose"
import { UserType } from './user.types' // Assuming UserType is here

// Define the shape of the populated author data
export type PopulatedUser = Pick<UserType, 'id' | 'name'>

export type BlogSEO = {
    metaTitle?: string
    metaDescription?: string
}

export type BlogPost = {
    _id: string
    title: string
    slug: string
    featureImage: string
    category?: string
    tags?: string[]
    content: string
    seo?: BlogSEO
    createdAt: string
    status: 'published' | 'draft' | 'archived' // Use literal types for safety
    updatedAt: string
    user?: PopulatedUser // 👈 CORRECTED: Included the populated author
}

export interface GetAllBlogsParams {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
}

export interface GetAllBlogsResponse {
    blogs: BlogPost[];
    totalPages: number;
}

// For use in the Mongoose action
export interface BlogQueryFilter {
    category?: string;
    title?: {
        $regex: string;
        $options: string;
    };
    _id?: ObjectId | string;
}