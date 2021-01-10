import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { SettingsStateInterface } from '../types/settingsState.interface';

export const settingsFeatureSelector = createFeatureSelector<
  AppStateInterface,
  SettingsStateInterface
>('settings');

export const isSubmittingSelector: MemoizedSelector<AppStateInterface, boolean> = createSelector(
  settingsFeatureSelector,
  (state: SettingsStateInterface) => state.isSubmitting
);

export const validationErrorsSelector: MemoizedSelector<AppStateInterface, BackendErrorsInterface | null> = createSelector(
  settingsFeatureSelector,
  (state: SettingsStateInterface) => state.validationErrors
);
