import { GetFeedResponseInterface } from './../../types/getFeedResponse.interface';
import { switchMap, catchError, map } from 'rxjs/operators';
import { FeedService } from './../../services/feed.service';
import { getFeedAction, getFeedSuccessAction, getFeedFailureAction } from './../actions/getFeed.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class GetFeedEffect {
  constructor(
    private actions$: Actions,
    private feedService: FeedService,
  ) {}

  getFeed$ = createEffect(() => this.actions$
    .pipe(
      ofType(getFeedAction),
      switchMap(({ url }) => {
        return this.feedService
          .getFeed(url)
          .pipe(
            map((feed: GetFeedResponseInterface) => getFeedSuccessAction({ feed })),
            catchError(() => of(getFeedFailureAction()))
          );
      })
    )
  );
}
