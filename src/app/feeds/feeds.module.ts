import { NgModule } from '@angular/core';

import { CommonModule as FeederCommonModule } from '../common/common.module';

import { FeedsComponent } from './feeds.component';
import { FeedComponent } from './feed/feed.component';
import { FeedListComponent } from './feed-list/feed-list.component';
import { FeedAddComponent } from './feed-add/feed-add.component';

@NgModule({
  imports: [FeederCommonModule],
  exports: [FeedsComponent, FeedComponent, FeedListComponent, FeedAddComponent],
  declarations: [FeedsComponent, FeedComponent, FeedListComponent, FeedAddComponent],
})
export class FeedsModule {}
