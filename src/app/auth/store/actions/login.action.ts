import { BackendErrorsInterface } from './../../../shared/types/backendErrors.interface';
import { CurrentUserInterface } from './../../../shared/types/currentUser.interface';
import { LoginRequesInterface } from './../../types/loginRequest.interface';
import { ActionTypes } from './../actionTypes';
import { createAction, props } from '@ngrx/store';

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{ request: LoginRequesInterface }>(),
);

export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{ currentUser: CurrentUserInterface }>(),
);

export const loginFailureAction = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{ errors: BackendErrorsInterface }>(),
);
