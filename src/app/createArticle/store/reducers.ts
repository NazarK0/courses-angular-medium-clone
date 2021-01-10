import { createArticleAction, createArticleSuccessAction, createArticleFailureAction } from './actions/createArticle.action';
import { createReducer, on, Action } from '@ngrx/store';
import { CreateArticleStateInterface } from './../types/createArticleState.interface';

const initialState: CreateArticleStateInterface = {
  isSubmitting: false,
  vaidationErrors: null,
};

const createArticleReducer = createReducer(initialState,
  on(createArticleAction,
    (state): CreateArticleStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(createArticleSuccessAction,
    (state): CreateArticleStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(createArticleFailureAction,
    (state, action): CreateArticleStateInterface => ({
      ...state,
      isSubmitting: false,
      vaidationErrors: action.errors,
    })
  )
);

export function reducers(state: CreateArticleStateInterface, action: Action) {
  return createArticleReducer(state, action);
}
