import { CurrentUserInterface } from './../../shared/types/currentUser.interface';
import { registerAction, registerFailureAction, registerSuccessAction } from './actions/register.action';
import { Action, ActionReducer, createReducer, on, State } from '@ngrx/store';
import { AuthStateInterface } from './../types/authState.interface';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
};

const authReducer = createReducer(initialState,
  on(registerAction, (state): AuthStateInterface => ({
    ...state,
    isSubmitting: true,
    validationErrors: null,
    })
  ),
  on(registerSuccessAction, (state, action): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    isLoggedIn: true,
    currentUser: action.currentUser,
    }),
  ),
  on(registerFailureAction, (state, action): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.errors,
    }),
  ),
);

export function reducer(state: AuthStateInterface, action: Action): AuthStateInterface {
  return authReducer(state, action);
}
