import { Schema, model, models } from 'mongoose';

export type Role = 'admin' | 'editor';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  role: { type: String, enum: ['admin', 'editor'], default: 'editor' },
}, { timestamps: true });

export default models.User || model('User', UserSchema);