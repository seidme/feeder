export class FeedDetails {
  url: string;
  title: string;
  link: string;
  author: string;
  description: string;
  image: string;

  constructor(props) {
    Object.assign(this, props);
  }
}
