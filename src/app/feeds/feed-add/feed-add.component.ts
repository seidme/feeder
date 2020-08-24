import { Component, OnInit, ViewChild } from '@angular/core';
import { Feed } from '@feeder/app/common/models';
import { ValidatorFn, AbstractControl, NgForm } from '@angular/forms';

import { FeedsService } from '@feeder/app/common/services';

@Component({
  selector: 'app-feed-add',
  templateUrl: './feed-add.component.html',
  styleUrls: ['./feed-add.component.scss'],
})
export class FeedAddComponent implements OnInit {
  @ViewChild('form') form: NgForm;

  submitted = false;
  newFeed = Feed.createEmpty();

  constructor(protected feedsService: FeedsService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.feedsService.addFeed(this.newFeed);
    this.newFeed = Feed.createEmpty();
    this.submitted = false;
  }
}
