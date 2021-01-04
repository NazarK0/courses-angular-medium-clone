import { getFeedAction, getFeedSuccessAction, getFeedFailureAction } from './actions/getFeed.action';
import { createReducer, on, Action } from '@ngrx/store';
import { FeedStateInterface } from './../types/feedState.interface';

const initialState: FeedStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const feedReducer = createReducer(initialState,
  on(getFeedAction,
    (state: FeedStateInterface): FeedStateInterface => ({
      ...state,
      isLoading: true,
  })),
  on(getFeedSuccessAction,
    (state: FeedStateInterface, action): FeedStateInterface => ({
      ...state,
      isLoading: false,
      data: action.feed
  })),
  on(getFeedFailureAction,
    (state): FeedStateInterface => ({
      ...state,
      isLoading: false,
  }))
);

export function reducers(state: FeedStateInterface, action: Action) {
  return feedReducer(state, action);
}
