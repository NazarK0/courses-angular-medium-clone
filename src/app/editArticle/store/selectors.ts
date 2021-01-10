import { ArticleInterface } from './../../shared/types/article.interface';
import { BackendErrorsInterface } from '../../shared/types/backendErrors.interface';
import { EditArticleStateInterface } from '../types/editArticleState.interface';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

export const editArticleFeatureSelector = createFeatureSelector<
AppStateInterface,
EditArticleStateInterface
>('editArticle');

export const isSubmittingSelector: MemoizedSelector<AppStateInterface, boolean> = createSelector(
  editArticleFeatureSelector,
  (state: EditArticleStateInterface) => state.isSubmitting
);

export const isLoadingSelector: MemoizedSelector<AppStateInterface, boolean> = createSelector(
  editArticleFeatureSelector,
  (state: EditArticleStateInterface) => state.isLoading
);

export const validationErrorsSelector: MemoizedSelector<AppStateInterface, BackendErrorsInterface | null> = createSelector(
  editArticleFeatureSelector,
  (state: EditArticleStateInterface) => state.vaidationErrors
);

export const articleSelector: MemoizedSelector<AppStateInterface, ArticleInterface | null> = createSelector(
  editArticleFeatureSelector,
  (state: EditArticleStateInterface) => state.article
);
