import { CurrentUserInterface } from './../../../shared/types/currentUser.interface';
import { switchMap, catchError } from 'rxjs/operators';
import { getCurrentUserAction, getCurrentUserSuccessAction, getCurrentUserFailureAction } from './../actions/getCurrentUser.action';
import { PersistanceService } from './../../../shared/services/persistance.service';
import { AuthService } from './../../services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class GetCurrentUserEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
  ) {}

  getCurrentUser$ = createEffect(() => this.actions$
    .pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        const token = this.persistanceService.get('accesToken');

        if(!token) {
          return of(getCurrentUserFailureAction());
        }

        return this.authService
          .getCurrentUser()
          .pipe((currentUser: CurrentUserInterface) => getCurrentUserSuccessAction({ currentUser }))
      })
    ),
      catchError(() => of(getCurrentUserFailureAction()))
  );
}
