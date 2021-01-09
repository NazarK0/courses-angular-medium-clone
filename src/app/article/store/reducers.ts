import { getArticleAction, getArticleSuccessAction, getArticleFailureAction } from './actions/getArticle.action';
import { createReducer, on, Action } from '@ngrx/store';
import { ArticleStateInterface } from '../types/articleState.interface';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: ArticleStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const articleReducer = createReducer(initialState,
  on(getArticleAction,
    (state: ArticleStateInterface): ArticleStateInterface => ({
      ...state,
      isLoading: true,
  })),
  on(getArticleSuccessAction,
    (state: ArticleStateInterface, action): ArticleStateInterface => ({
      ...state,
      isLoading: false,
      data: action.article
  })),
  on(getArticleFailureAction,
    (state): ArticleStateInterface => ({
      ...state,
      isLoading: false,
  })),
  on(routerNavigationAction, (): ArticleStateInterface => initialState),
);

export function reducers(state: ArticleStateInterface, action: Action): ArticleStateInterface {
  return articleReducer(state, action);
}
