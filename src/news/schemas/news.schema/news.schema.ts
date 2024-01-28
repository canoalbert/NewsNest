import { Schema } from 'mongoose';

export const NewsSchema = new Schema({
  section: {
    name: { type: String, required: true },
    icon: { type: String, required: true },
  },
  images: [{ type: String }],
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  content: { type: String, required: true },
});
