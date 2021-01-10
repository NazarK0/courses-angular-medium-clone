import { updateCurrentUserAction, updateCurrentUserFailureAction, updateCurrentUserSuccessAction } from './../actions/updateCurrentUser.action';
import { CurrentUserInterface } from './../../../shared/types/currentUser.interface';
import { AuthService } from './../../services/auth.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UpdateCurrentUserEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    ) {}

  updateCurrentUser$ = createEffect(() => this.actions$.pipe(
    ofType(updateCurrentUserAction),
    switchMap(({ currentUserInput }) => {
      return this.authService.updateCurrentUser(currentUserInput).pipe(
        map((currentUser: CurrentUserInterface) => {
          return updateCurrentUserSuccessAction({ currentUser });
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(updateCurrentUserFailureAction({ errors: errorResponse.error.errors }));
        })
      );
    })
  ));
}
