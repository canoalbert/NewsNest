import { Section } from '../../interfaces/news/section.interface';

export class NewsDto {
  section: Section;
  images: string[];
  title: string;
  subtitle: string;
  author: string;
  date: Date;
  content: string;
}
