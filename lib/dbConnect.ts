import mongoose, { Mongoose } from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

// Augment the NodeJS Global type with a custom property
declare global {
  // Use a unique name for the cache to avoid conflicts with the mongoose module
  var mongooseCache: {
    conn: Mongoose | null
    promise: Promise<Mongoose> | null
  }
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
// Use the new, unique cache name
let cached = global.mongooseCache

if (!cached) {
  // Initialize the cache on the global object
  cached = global.mongooseCache = { conn: null, promise: null }
}

async function connectDB(): Promise<Mongoose> {
  if (cached.conn) {
    console.log('🚀 Using cached connection')
    // This return is now correctly typed
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    console.log('🔌 Creating new connection')
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      return mongooseInstance
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default connectDB
