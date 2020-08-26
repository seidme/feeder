import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { RssData, RssDataError } from '@feeder/app/common/models';

@Injectable({
  providedIn: 'root',
})
export class Rss2JsonService {
  readonly API_ENDPOINT = 'https://api.rss2json.com/v1/api.json';
  readonly API_KEY = 'oof8vay2hulspzvrqazienyvlydte6ptnluks8hj';

  constructor(protected http: HttpClient) {}

  getRssData(url: string): Promise<RssData | RssDataError> {
    const options = {
      params: {
        api_key: this.API_KEY,
        rss_url: url,
        order_by: 'pubDate',
        count: '20',
      },
    };

    return this.http
      .get(this.API_ENDPOINT, options)
      .pipe(
        map((response) => new RssData(response)),
        catchError((e) => {
          return of(
            new RssDataError({
              isErrorReponse: true,
              isMappingError: e instanceof Error,
              rawError: e,
            })
          );
        })
      )
      .toPromise();
  }

  async isRssValid(url: string): Promise<boolean> {
    const response = await this.getRssData(url);
    return !(response as RssDataError).isErrorReponse;
  }
}
