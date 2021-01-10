import { ArticleInterface } from './../../shared/types/article.interface';
import { BackendErrorsInterface } from '../../shared/types/backendErrors.interface';

export interface EditArticleStateInterface {
  isSubmitting: boolean;
  isLoading: boolean;
  vaidationErrors: BackendErrorsInterface | null;
  article: ArticleInterface | null;
}
