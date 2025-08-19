import { Schema, model, models } from 'mongoose';

const MessageSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  service: String,
  message: String,
}, { timestamps: true });

export default models.Message || model('Message', MessageSchema)