import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { FeedsStoreService } from '@feeder/app/common/services/feeds-store.service';
import { Rss2JsonService } from '@feeder/app/common/services/rss2json.service';
import { RssData, RssDataError, Post, Feed } from '@feeder/app/common/models';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  /*
  Make _postsSource private so it's not accessible from the outside,
  expose it as feeds$ observable (read-only) instead.
  Write to _postsSource only through specified store methods below.
  */
  private readonly _postsSource = new BehaviorSubject<Post[]>([]);

  /* Exposed observable (read-only). */
  readonly posts$ = this._postsSource.asObservable();

  constructor(protected feedsStoreService: FeedsStoreService, protected rss2JsonService: Rss2JsonService) {
    this.feedsStoreService.feeds$.subscribe(async (feeds) => {
      const posts = await this.getPosts(feeds);
      this._postsSource.next(posts);
    });
  }

  async getPosts(feeds: Feed[]): Promise<Post[]> {
    if (!feeds.length) {
      return [];
    }

    const promises = feeds.map((f) => this.rss2JsonService.getRssData(f.url));
    const responses = await Promise.all(promises);

    const okResponses = responses.filter((r) => !(r as RssDataError).isErrorReponse);
    const errorResponses = responses.filter((r) => (r as RssDataError).isErrorReponse);

    const postSets = (okResponses as RssData[]).map((rssData) => rssData.asPostsWithFeedInfo());
    const mergedPosts = [].concat(...postSets);

    mergedPosts.sort((pA, pB) => {
      return Date.parse(pA.pubDate) > Date.parse(pB.pubDate) ? 1 : -1;
    });

    return mergedPosts;
  }
}
