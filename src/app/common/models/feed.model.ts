export class Feed {
  name: string;
  url: string;

  constructor(props) {
    this.name = props.name;
    this.url = props.url;
  }

  static createEmpty(): Feed {
    return new Feed({
      name: '',
      url: '',
    });
  }
}
