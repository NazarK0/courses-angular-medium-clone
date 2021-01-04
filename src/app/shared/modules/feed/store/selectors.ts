import { GetFeedResponseInterface } from './../types/getFeedResponse.interface';
import { FeedStateInterface } from './../types/feedState.interface';
import { AppStateInterface } from './../../../types/appState.interface';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
export const feedFeatureSelector = createFeatureSelector<
  AppStateInterface,
  FeedStateInterface
>('feed');

export const isLoadingSelector: MemorizedSelector<AppStateInterface, boolean> = createSelector(
  feedFeatureSelector,
  (feedState: FeedStateInterface) => feedState.isLoading
);

export const errorSelector: MemorizedSelector<AppStateInterface, string | null> = createSelector(
  feedFeatureSelector,
  (feedState: FeedStateInterface) => feedState.error
);

export const feedSelector: MemoizedSelector<AppStateInterfaces, GetFeedResponseInterface | null> = createSelector(
  feedFeatureSelector,
  (feedState: FeedStateInterface) => feedState.data
);
