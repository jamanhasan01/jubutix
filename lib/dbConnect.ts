// lib/mongodb.ts
import mongoose, { Mongoose } from 'mongoose'

interface MongooseCache {
  conn: Mongoose | null
  promise: Promise<Mongoose> | null
}

let cached: MongooseCache = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

export async function connectDB(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI as string, {
   
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}
