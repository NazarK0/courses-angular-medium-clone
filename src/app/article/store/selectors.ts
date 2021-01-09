import { ArticleInterface } from './../../shared/types/article.interface';
import { ArticleStateInterface } from '../types/articleState.interface';
import { AppStateInterface } from './../../shared/types/appState.interface';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

export const articleFeatureSelector = createFeatureSelector<
  AppStateInterface,
  ArticleStateInterface
>('article');

export const isLoadingSelector: MemoizedSelector<AppStateInterface, boolean> = createSelector(
  articleFeatureSelector,
  (articleState: ArticleStateInterface) => articleState.isLoading
);

export const errorSelector: MemoizedSelector<AppStateInterface, string | null> = createSelector(
  articleFeatureSelector,
  (articleState: ArticleStateInterface) => articleState.error
);

export const articleSelector: MemoizedSelector<AppStateInterface, ArticleInterface | null> = createSelector(
  articleFeatureSelector,
  (articleState: ArticleStateInterface) => articleState.data
);
