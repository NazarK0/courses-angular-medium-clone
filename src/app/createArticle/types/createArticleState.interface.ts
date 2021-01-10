import { BackendErrorsInterface } from './../../shared/types/backendErrors.interface';

export interface CreateArticleStateInterface {
  isSubmitting: boolean;
  vaidationErrors: BackendErrorsInterface | null;
}
