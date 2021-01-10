import { updateArticleAction, updateArticleFailureAction, updateArticleSuccessAction } from './actions/updateArticle.action';
import { createReducer, on, Action } from '@ngrx/store';
import { EditArticleStateInterface } from '../types/editArticleState.interface';
import { getArticleAction, getArticleFailureAction, getArticleSuccessAction } from './actions/getArticle.action';

const initialState: EditArticleStateInterface = {
  isSubmitting: false,
  isLoading: false,
  vaidationErrors: null,
  article: null,
};

const editArticleReducer = createReducer(initialState,
  on(updateArticleAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(updateArticleSuccessAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(updateArticleFailureAction,
    (state, action): EditArticleStateInterface => ({
      ...state,
      isSubmitting: false,
      vaidationErrors: action.errors,
    })
  ),
  on(getArticleAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(getArticleSuccessAction,
    (state, action): EditArticleStateInterface => ({
      ...state,
      isLoading: false,
      article: action.article,
    })
  ),
  on(getArticleFailureAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
);

export function reducers(state: EditArticleStateInterface, action: Action): EditArticleStateInterface {
  return editArticleReducer(state, action);
}
