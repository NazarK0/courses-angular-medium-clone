import { PopularTagType } from './../../../../types/popularTag.type';
import { switchMap, map, catchError } from 'rxjs/operators';
import { getPopularTagsAction, getPopularTagsSuccessAction, getPopularTagsFailureAction } from './../actions/getPopularTags.action';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { PopularTagsService } from './../../services/popularTags.service';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class GetPopularTagsEffect {
  constructor(
    private actions$: Actions,
    private popularTagsService: PopularTagsService,
  ) {}

  getPopularTags$ = createEffect(() => this.actions$
    .pipe(
      ofType(getPopularTagsAction),
      switchMap(() => {
        return this.popularTagsService
          .getPopularTags()
          .pipe(
            map((popularTags: PopularTagType[]) => getPopularTagsSuccessAction({ popularTags })),
            catchError(() => of(getPopularTagsFailureAction()))
          );
      })
    )
  );
}
