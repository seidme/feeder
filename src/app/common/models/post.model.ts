export class Post {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  enclosure: { [key: string]: any };
  categories: any[];

  feedTitle?: string;

  constructor(props) {
    Object.assign(this, props);
  }
}
