import { BackendErrorsInterface } from './../../shared/types/backendErrors.interface';
import { CreateArticleStateInterface } from './../types/createArticleState.interface';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

export const createArticleFeatureSelector = createFeatureSelector<
AppStateInterface,
CreateArticleStateInterface
>('createArticle');

export const isSubmittingSelector: MemoizedSelector<AppStateInterface, boolean> = createSelector(
  createArticleFeatureSelector,
  (state: CreateArticleStateInterface) => state.isSubmitting
);

export const validationErrorsSelector: MemoizedSelector<AppStateInterface, BackendErrorsInterface | null> = createSelector(
  createArticleFeatureSelector,
  (state: CreateArticleStateInterface) => state.vaidationErrors
);
