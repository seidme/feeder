import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { trigger, transition, useAnimation } from '@angular/animations';

import { Debounce } from '@feeder/app/common/decorators';
import { Feed } from '@feeder/app/common/models';
import { FeedsStoreService } from '@feeder/app/common/services';
import { UnsubscribeOnDestroy } from '@feeder/app/common/classes';
import { listItemInsert, listItemRemove } from '@feeder/app/common/animations';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.scss'],
  animations: [
    trigger('listItemInsertRemoveAnimation', [
      transition('void => *', [useAnimation(listItemInsert, {})]),
      transition('* => void', [useAnimation(listItemRemove, {})]),
    ]),
  ],
})
export class FeedListComponent extends UnsubscribeOnDestroy implements OnInit {
  searchTerm = '';
  feeds: Feed[] = [];
  filteredFeeds: Feed[] = [];

  constructor(protected feedsStoreService: FeedsStoreService) {
    super();
  }

  ngOnInit(): void {
    this.addTestFeedIfNoFeeds();

    this.feedsStoreService.feeds$.pipe(takeUntil(this.destroyed$)).subscribe((feeds) => {
      this.feeds = feeds;
      this.filterFeeds(this.searchTerm);
    });
  }

  @Debounce(200, false)
  filterFeeds(value: string): void {
    this.filteredFeeds = this.feeds.filter((f) => f.name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1);
  }

  removeFeed(feed: Feed): void {
    this.feedsStoreService.removeFeed(feed);
  }

  addTestFeedIfNoFeeds(): void {
    const feeds = this.feedsStoreService.getFeeds();
    if (!feeds.length) {
      this.feedsStoreService.addFeed(new Feed({ name: 'Adweek', url: 'https://www.adweek.com/feed/' }));
      this.feedsStoreService.addFeed(new Feed({ name: 'TechCrunch', url: 'https://techcrunch.com/feed/' }));
    }
  }
}
