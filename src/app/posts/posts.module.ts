import { NgModule } from '@angular/core';

import { CommonModule as FeederCommonModule } from '../common/common.module';

import { PostsComponent } from './posts.component';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';

@NgModule({
  imports: [FeederCommonModule],
  exports: [PostsComponent, PostComponent, PostListComponent],
  declarations: [PostsComponent, PostComponent, PostListComponent],
})
export class PostsModule {}
