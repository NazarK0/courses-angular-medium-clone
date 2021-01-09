import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { map } from 'rxjs/operators';
import { currentUserSelector } from './../../../auth/store/selectors';
import { ArticleInterface } from './../../../shared/types/article.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { isLoadingSelector, errorSelector, articleSelector } from '../../store/selectors';
import { GetArticleResponseInterface } from '../../../shared/types/getArticleResponse.interface';
import { Observable, Subscription } from 'rxjs';
import { getArticleAction } from '../../store/actions/getArticle.action';
import { Store, select } from '@ngrx/store';
import { Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { parseUrl, stringify } from 'query-string';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  isAuthor$!: Observable<boolean>;
  slug!: string;
  article: ArticleInterface | null = null;
  articleSubscription: Subscription = new Subscription();

  constructor(private store: Store, private route: ActivatedRoute) {}

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') || '';
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isAuthor$ = combineLatest([
      this.store.pipe(select(articleSelector)),
      this.store.pipe(select(currentUserSelector)),
    ]).pipe(
        map(([article, currentUser]: [ArticleInterface | null, CurrentUserInterface | null]) => {
          if (!article || !currentUser) { return false; }

          console.log('map', article, currentUser);
          return currentUser.username === article.author.username;
        })
      );
  }

  initializeListeners(): void {
    this.articleSubscription.add(
      this.store.pipe(select(articleSelector)).subscribe(
        (article: ArticleInterface | null) => {
          this.article = article;
        }
      )
    );
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.articleSubscription.unsubscribe();
  }
}
