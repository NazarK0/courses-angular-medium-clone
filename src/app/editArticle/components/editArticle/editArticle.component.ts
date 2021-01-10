import { ArticleInterface } from './../../../shared/types/article.interface';
import { AppStateInterface } from './../../../shared/types/appState.interface';
import { ActivatedRoute } from '@angular/router';
import { updateArticleAction } from '../../store/actions/updateArticle.action';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ArticleInputInterface } from '../../../shared/types/articleInput.interface';
import { Component, OnInit } from '@angular/core';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { articleSelector, isLoadingSelector, isSubmittingSelector, validationErrorsSelector } from '../../store/selectors';
import { getArticleAction } from '../../store/actions/getArticle.action';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'mc-edit-article',
  templateUrl: './editArticle.component.html',
})
export class EditArticleComponent implements OnInit {
  initialValues$!: Observable<ArticleInputInterface>;
  isSubmitting$!: Observable<boolean>;
  isLoading$!: Observable<boolean>;
  backendErrors$!: Observable<BackendErrorsInterface | null>;
  slug!: string;


  constructor(
    private store: Store<AppStateInterface>,
    private route: ActivatedRoute,
    ) {}

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') || '';
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      filter<ArticleInterface | null>(Boolean),
      map((article: ArticleInterface | null) => {
        if (article) {
          const { title, description, body, tagList } = article;
          return {
            title,
            description,
            body,
            tagList,
          };
        } else {
          return {
            title: '',
            description: '',
            body: '',
            tagList: [],
          };
        }
      }),
    );
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(updateArticleAction({ slug: this.slug, articleInput }));
  }
}
