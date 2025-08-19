import { Schema, model, models, Types } from 'mongoose'

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Types.ObjectId, ref: 'User' },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default models.Blog || model('Blog', BlogSchema)
