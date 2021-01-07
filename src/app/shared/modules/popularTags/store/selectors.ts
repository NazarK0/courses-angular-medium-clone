import { PopularTagType } from './../../../types/popularTag.type';
import { PopularTagStateInterface } from './../types/popularTagsState.interface';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
export const popularTagsFeatureSelector = createFeatureSelector<
  AppStateInterface,
  PopularTagStateInterface
>('popularTags');

export const isLoadingSelector: MemoizedSelector<AppStateInterface, boolean> = createSelector(
  popularTagsFeatureSelector,
  (popularTagsState: PopularTagStateInterface) => popularTagsState.isLoading
);

export const errorSelector: MemoizedSelector<AppStateInterface, string | null> = createSelector(
  popularTagsFeatureSelector,
  (populaTagsState: PopularTagStateInterface) => populaTagsState.error
);

export const popularTagsSelector: MemoizedSelector<AppStateInterface, PopularTagType[] | null> = createSelector(
  popularTagsFeatureSelector,
  (popularTagsState: PopularTagStateInterface) => popularTagsState.data
);
