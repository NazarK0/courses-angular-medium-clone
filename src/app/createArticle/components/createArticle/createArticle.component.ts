import { createArticleAction } from './../../store/actions/createArticle.action';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ArticleInputInterface } from './../../../shared/types/articleInput.interface';
import { Component, OnInit } from '@angular/core';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selectors';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';

@Component({
  selector: 'mc-create-article',
  templateUrl: './createArticle.component.html',
})
export class CreateArticleComponent implements OnInit {
  initialValues: ArticleInputInterface = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  isSubmitting$!: Observable<boolean>;
  backendErrors$!: Observable<BackendErrorsInterface | null>;

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    const t = 5;
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(createArticleAction({ articleInput }));
  }
}
