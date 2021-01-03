import { BackendErrorsInterface } from './../../shared/types/backendErrors.interface';
import { AuthStateInterface } from './../types/authState.interface';
import { AppStateInterface } from './../../shared/types/appState.interface';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

export const authFeatureSelector = createFeatureSelector<
  AppStateInterface,
  AuthStateInterface
>('auth');

export const isSubmittingSelector: MemoizedSelector<AppStateInterface, boolean> = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isSubmitting
);

export const validationErrorsSelector: MemoizedSelector<AppStateInterface, BackendErrorsInterface | null> = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.validationErrors
);
