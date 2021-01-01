import { registerAction } from './actions/register.action';
import { Action, ActionReducer, createReducer, on, State } from '@ngrx/store';
import { AuthStateInterface } from './../types/authState.interface';

const initialState: AuthStateInterface = {
  isSubmitting: false,
};

const authReducer = createReducer(initialState,
  on(registerAction, (state): AuthStateInterface => ({
    ...state,
    isSubmitting: true,
  })
  )
);

export function reducer(state: AuthStateInterface, action: Action): AuthStateInterface {
  return authReducer(state, action);
}