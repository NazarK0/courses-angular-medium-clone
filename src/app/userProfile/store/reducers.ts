import { getUserProfileAction, getUserProfileFailureAction, getUserProfileSuccessAction } from './actions/getUserProfile.action';
import { createReducer, on, Action } from '@ngrx/store';
import { UserProfileStateInterface } from './../types/userProfileState.interface';
const initialState: UserProfileStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const userProfileReducer = createReducer(initialState,
  on(getUserProfileAction,
    (state): UserProfileStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(getUserProfileSuccessAction,
    (state, action): UserProfileStateInterface => ({
      ...state,
      isLoading: false,
      data: action.userProfile
    })
  ),
  on(getUserProfileFailureAction,
    (state): UserProfileStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
);

export function reducers(state: UserProfileStateInterface, action: Action): UserProfileStateInterface {
  return userProfileReducer(state, action);
}
