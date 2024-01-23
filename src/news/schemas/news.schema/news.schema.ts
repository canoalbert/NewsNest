import { Document, Schema } from 'mongoose';

export interface NewsDocument extends Document {
  images: string[];
  title: string;
  subtitle: string;
  section: {
    name: string;
    icon: string;
  };
  author: string;
  date: Date;
  content: string;
}

export const NewsSchema = new Schema<NewsDocument>({
  images: [{ type: String }],
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  section: {
    name: { type: String, required: true },
    icon: { type: String, required: true },
  },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  content: { type: String, required: true },
});
