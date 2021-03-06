import { Component, OnInit, ViewChild } from '@angular/core';
import { Feed } from '@feeder/app/common/models';
import { NgForm } from '@angular/forms';

import { LoaderDirective } from '@flxng/loader';

import { FeedsStoreService, Rss2JsonService } from '@feeder/app/common/services';

@Component({
  selector: 'app-feed-add',
  templateUrl: './feed-add.component.html',
  styleUrls: ['./feed-add.component.scss'],
})
export class FeedAddComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  @ViewChild(LoaderDirective, { static: true }) loader: LoaderDirective;

  submitted = false;
  newFeed = Feed.createEmpty();

  constructor(protected feedsStoreService: FeedsStoreService, protected rss2JsonService: Rss2JsonService) {}

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    this.submitted = true;
    this.loader.show();

    this.validateName(this.newFeed.name);
    await this.validateUrl(this.newFeed.url);

    if (this.form.invalid) {
      this.loader.hide();
      return;
    }

    this.feedsStoreService.addFeed(this.newFeed);
    this.newFeed = Feed.createEmpty();
    this.submitted = false;
    this.loader.hide();
  }

  validateName(name: string): void {
    if (!name) {
      this.form.controls.name.setErrors({ required: true });
      return;
    }

    if (this.feedsStoreService.feedNameExists(name)) {
      this.form.controls.name.setErrors({ alreadyExists: true });
      return;
    }
  }

  async validateUrl(url: string): Promise<void> {
    if (!url) {
      this.form.controls.url.setErrors({ required: true });
      return;
    }

    if (this.feedsStoreService.feedUrlExists(url)) {
      this.form.controls.url.setErrors({ alreadyExists: true });
      return;
    }

    if (!(await this.rss2JsonService.isRssValid(url))) {
      this.form.controls.url.setErrors({ urlInvalid: true });
      return;
    }
  }
}
