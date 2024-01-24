export class NewsDto {
  section: {
    name: string;
    icon: string;
  };
  images: string[];
  title: string;
  subtitle: string;
  author: string;
  date: Date;
  content: string;
}
