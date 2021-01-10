import { ArticleInterface } from './../../../../types/article.interface';
import { addToFavoritesAction, addToFavoritesFailureAction, addToFavoritesSuccessAction } from './../actions/addToFavorites.action';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { AddToFavoritesService } from '../../services/addToFavorites.service';

@Injectable()
export class AddToFavoritesEffect {
  constructor(
    private actions$: Actions,
    private addToFavoritesService: AddToFavoritesService,
  ) {}

  addToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToFavoritesAction),
      switchMap(({ isFavorited, slug }) => {
        const article$ = isFavorited
          ? this.addToFavoritesService.removeFromFavorites(slug)
          : this.addToFavoritesService.addToFavorites(slug);

        return article$.pipe(
            map((article: ArticleInterface) => addToFavoritesSuccessAction({ article })),
            catchError(() => of(addToFavoritesFailureAction()))
          );
      }),
    ),
  );
}
