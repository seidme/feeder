import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { trigger, transition, useAnimation } from '@angular/animations';

import { Debounce } from '@feeder/app/common/decorators';
import { Feed } from '@feeder/app/common/models';
import { FeedsService } from '@feeder/app/common/services';
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

  constructor(protected feedsService: FeedsService) {
    super();
  }

  ngOnInit(): void {
    this.addTestFeedIfNoFeeds();

    this.feedsService.feeds$.pipe(takeUntil(this.destroyed$)).subscribe((feeds) => {
      this.feeds = feeds;
      this.filterFeeds(this.searchTerm);
    });
  }

  @Debounce(200, false)
  filterFeeds(value: string): void {
    this.filteredFeeds = this.feeds.filter((f) => f.name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1);
  }

  deleteFeed(feed: Feed): void {
    this.feedsService.removeFeed(feed);
  }

  addTestFeedIfNoFeeds(): void {
    const feeds = this.feedsService.getFeeds();
    if (!feeds.length) {
      this.feedsService.addFeed(new Feed({ name: 'Adweek Test Feed', url: 'https://www.adweek.com/feed/' }));
    }
  }
}
