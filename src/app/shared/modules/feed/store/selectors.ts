import { GetFeedResponseInterface } from './../types/getFeedResponse.interface';
import { FeedStateInterface } from './../types/feedState.interface';
import { AppStateInterface } from './../../../types/appState.interface';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
export const feedFeatureSelector = createFeatureSelector<
  AppStateInterface,
  FeedStateInterface
>('feed');

export const isLoadingSelector: MemoizedSelector<AppStateInterface, boolean> = createSelector(
  feedFeatureSelector,
  (feedState: FeedStateInterface) => feedState.isLoading
);

export const errorSelector: MemoizedSelector<AppStateInterface, string | null> = createSelector(
  feedFeatureSelector,
  (feedState: FeedStateInterface) => feedState.error
);

export const feedSelector: MemoizedSelector<AppStateInterface, GetFeedResponseInterface | null> = createSelector(
  feedFeatureSelector,
  (feedState: FeedStateInterface) => feedState.data
);
