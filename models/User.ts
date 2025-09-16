import { Schema, model, models } from 'mongoose'

export type Role = 'admin' | 'editor' | 'user'

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: {
      type: String,
      required: true,
    },
    role: { type: String, enum: ['admin', 'editor', 'user'], default: 'user' },
  },
  { timestamps: true }
)

export default models.User || model('User', UserSchema)
