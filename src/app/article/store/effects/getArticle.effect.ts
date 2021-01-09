import { ArticleInterface } from './../../../shared/types/article.interface';
import { switchMap, catchError, map } from 'rxjs/operators';
import { ArticleService as SharedArticleService } from '../../../shared/services/article.service';
import { getArticleAction, getArticleSuccessAction, getArticleFailureAction } from '../actions/getArticle.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class GetArticleEffect {
  constructor(
    private actions$: Actions,
    private sharedArticleService: SharedArticleService,
  ) {}

  getArticle$ = createEffect(() => this.actions$
    .pipe(
      ofType(getArticleAction),
      switchMap(({ slug }) => {
        return this.sharedArticleService
          .getArticle(slug)
          .pipe(
            map((article: ArticleInterface) => getArticleSuccessAction({ article })),
            catchError(() => of(getArticleFailureAction()))
          );
      })
    )
  );
}
