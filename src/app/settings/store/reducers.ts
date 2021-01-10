import { updateArticleFailureAction } from './../../editArticle/store/actions/updateArticle.action';
import { updateCurrentUserAction, updateCurrentUserSuccessAction } from './../../auth/store/actions/updateCurrentUser.action';
import { createReducer, on, Action } from '@ngrx/store';
import { SettingsStateInterface } from './../types/settingsState.interface';
import { stat } from 'fs';

const initialState: SettingsStateInterface = {
  isSubmitting: false,
  validationErrors: null,
};

const settingsReducer = createReducer(initialState,
  on(updateCurrentUserAction,
    (state): SettingsStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(updateCurrentUserSuccessAction,
    (state): SettingsStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(updateArticleFailureAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  )
);

export function reducers(state: SettingsStateInterface, action: Action): SettingsStateInterface {
  return settingsReducer(state, action);
}
