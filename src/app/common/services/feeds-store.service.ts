import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { Feed } from '@feeder/app/common/models';
import { StorageService } from './storage.service';

/*
The service implements immutability pattern - e.g. whenever a feed is added/removed, new intance of feeds array is created.
Although not really necessary unless performance is critical, with this approach 'OnPush' Change Detection strategy
can easily be incorporated.
*/
@Injectable({
  providedIn: 'root',
})
export class FeedsStoreService {
  private readonly FEEDS_STORAGE_KEY = 'FEEDS';

  /*
  Make _feedsSource private so it's not accessible from the outside,
  expose it as feeds$ observable (read-only) instead.
  Write to _feedsSource only through specified store methods below.
  */
  private readonly _feedsSource = new BehaviorSubject<Feed[]>([]);

  /* Exposed observable (read-only). */
  readonly feeds$ = this._feedsSource.asObservable();

  constructor(protected storageService: StorageService) {
    const feeds = this.storageService.get(this.FEEDS_STORAGE_KEY);
    this._feedsSource.next(feeds || []);
  }

  /* Get last value without subscribing to the feeds$ observable (synchronously). */
  getFeeds(): Feed[] {
    return this._feedsSource.getValue();
  }

  private _setFeeds(feeds: Feed[]): void {
    this.storageService.set(this.FEEDS_STORAGE_KEY, feeds);
    this._feedsSource.next(feeds);
  }

  addFeed(feed: Feed): void {
    const feeds = [...this.getFeeds(), feed];
    this._setFeeds(feeds);
  }

  removeFeed(feed: Feed): void {
    const feeds = this.getFeeds().filter((f) => f.url !== feed.url);
    this._setFeeds(feeds);
  }

  feedNameExists(name: string): boolean {
    return this.getFeeds().some((f) => f.name.toLocaleLowerCase() === name.toLocaleLowerCase());
  }

  feedUrlExists(url: string): boolean {
    return this.getFeeds().some((f) => f.url === url);
  }
}
