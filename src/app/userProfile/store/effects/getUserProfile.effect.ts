import { ProfileInterface } from './../../../shared/types/profile.interface';
import { getUserProfileAction, getUserProfileSuccessAction, getUserProfileFailureAction } from './../actions/getUserProfile.action';
import { UserProfileService } from './../../services/userProfie.service';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class GetUserProfileEffect {
  constructor(
    private actions$: Actions,
    private userProfileService: UserProfileService,
  ) {}

  getUserProfile$ = createEffect(() => this.actions$
    .pipe(
      ofType(getUserProfileAction),
      switchMap(({ slug }) => {
        return this.userProfileService
          .getUserProfile(slug)
          .pipe(
            map((userProfile: ProfileInterface) => getUserProfileSuccessAction({ userProfile })),
            catchError(() => of(getUserProfileFailureAction()))
          );
      })
    )
  );
}
