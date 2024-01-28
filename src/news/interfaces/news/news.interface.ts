import { Section } from './section.interface';

export interface News {
  section: Section;
  images: string[];
  title: string;
  subtitle: string;
  author: string;
  date: Date;
  content: string;
}
