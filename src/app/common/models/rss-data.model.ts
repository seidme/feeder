import { Post } from './post.model';
import { FeedDetails } from './feed-details.model';

export class RssData {
  feed: FeedDetails;
  posts: Post[];

  constructor(props) {
    this.feed = new FeedDetails(props.feed);
    this.posts = props.items.map((item) => new Post(item));
  }

  asPostsWithFeedInfo(): Post[] {
    return this.posts.map((post) => {
      post.feedTitle = this.feed.title;
      return post;
    });
  }
}
