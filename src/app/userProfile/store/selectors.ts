import { ProfileInterface } from './../../shared/types/profile.interface';
import { UserProfileStateInterface } from './../types/userProfileState.interface';
import { AppStateInterface } from './../../shared/types/appState.interface';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

export const userProfileFeatureSelector = createFeatureSelector<
  AppStateInterface,
  UserProfileStateInterface
>('userProfile');

export const isLoadingSelector: MemoizedSelector<AppStateInterface, boolean> = createSelector(
  userProfileFeatureSelector,
  (state: UserProfileStateInterface) => state.isLoading
);

export const errorSelector: MemoizedSelector<AppStateInterface, string | null> = createSelector(
  userProfileFeatureSelector,
  (state: UserProfileStateInterface) => state.error
);

export const userProfileSelector: MemoizedSelector<AppStateInterface, ProfileInterface | null> = createSelector(
  userProfileFeatureSelector,
  (state: UserProfileStateInterface) => state.data
);
