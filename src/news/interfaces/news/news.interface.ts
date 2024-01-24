export interface News {
  section: {
    name: string;
    icon: string;
  };
  _id: string;
  images: string[];
  title: string;
  subtitle: string;
  author: string;
  date: Date;
  content: string;
}
