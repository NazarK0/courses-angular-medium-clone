import { createReducer, on, Action } from '@ngrx/store';
import { getPopularTagsAction, getPopularTagsSuccessAction, getPopularTagsFailureAction } from './actions/getPopularTags.action';
import { PopularTagStateInterface } from './../types/popularTagsState.interface';

const initialState: PopularTagStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const popularTagsReducer = createReducer(initialState,
  on(getPopularTagsAction,
    (state: PopularTagStateInterface): PopularTagStateInterface => ({
      ...state,
      isLoading: true,
    })),
  on(getPopularTagsSuccessAction,
    (state, action): PopularTagStateInterface => ({
      ...state,
      isLoading: false,
      data: action.popularTags,
    })),
  on(getPopularTagsFailureAction,
    (state): PopularTagStateInterface => ({
      ...state,
      isLoading: false,
    })),
);

export function reducers(state: PopularTagStateInterface, action: Action): PopularTagStateInterface {
  return popularTagsReducer(state, action);
}
