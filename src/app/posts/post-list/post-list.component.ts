import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { PostsService } from '@feeder/app/common/services';
import { UnsubscribeOnDestroy } from '@feeder/app/common/classes';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent extends UnsubscribeOnDestroy implements OnInit {
  constructor(public postsService: PostsService) {
    super();
  }

  ngOnInit(): void {}
}
