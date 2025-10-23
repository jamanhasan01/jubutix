import { Schema, model, models } from 'mongoose'

export type Role = 'admin' | 'moderator' | 'user'

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: {
      type: String,
      default: null,
    },
    emailVerified: {
      type: Date,
      default: null,
    },
    role: { type: String, enum: ['admin', 'moderator', 'user'], default: 'user' },
  },
  { timestamps: true }
)

export default models.User || model('User', UserSchema)
