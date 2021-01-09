import { Router } from '@angular/router';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { ArticleService } from '../../services/article.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { deleteArticleAction, deleteArticleFailureAction, deleteArticleSuccessAction } from '../actions/deleteArticle.action';

@Injectable()
export class DeleteArticleEffect {
  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private router: Router,
  ) {}

  deleteArticle$ = createEffect(() => this.actions$
    .pipe(
      ofType(deleteArticleAction),
      switchMap(({ slug }) => {
        return this.articleService
          .deleteArticle(slug)
          .pipe(
            map(() => deleteArticleSuccessAction()),
            catchError(() => of(deleteArticleFailureAction()))
          );
      })
    )
  );

  redirectAfterDelete$ = createEffect(() => this.actions$
    .pipe(
      ofType(deleteArticleSuccessAction),
      tap(() => {
        this.router.navigate(['/'])
      })
    ),
    { dispatch: false }
  );
}
