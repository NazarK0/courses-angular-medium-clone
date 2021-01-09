import { ActivatedRoute, Params, Router } from '@angular/router';
import { isLoadingSelector, errorSelector, feedSelector } from './../../store/selectors';
import { GetFeedResponseInterface } from './../../types/getFeedResponse.interface';
import { Observable, Subscription } from 'rxjs';
import { getFeedAction } from './../../store/actions/getFeed.action';
import { Store, select } from '@ngrx/store';
import { Input, OnInit, OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { parseUrl, stringify } from 'query-string';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges {
  // tslint:disable-next-line: no-input-rename
  @Input('apiUrl') apiUrlProps!: string;

  isLoading$: Observable<boolean> = new Observable();
  error$: Observable<string | null> = new Observable();
  feed$: Observable<GetFeedResponseInterface | null> = new Observable();
  limit: number = environment.limit;
  baseUrl = '/';
  queryParamsSubscription: Subscription = new Subscription();
  currentPage = 1;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.feed$ = this.store.pipe(select(feedSelector));
    this.baseUrl = this.router.url.split('?')[0];
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = parseUrl(this.apiUrlProps);
    const stringifiedParams = stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;

    this.store.dispatch(getFeedAction({ url: apiUrlWithParams }));
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route
      .queryParams
      .subscribe((params: Params) => {
        this.currentPage = Number(params.page || '1') ;
        this.fetchFeed();
      });
  }

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    const isApiUrlChanged = !changes.apiUrlProps.firstChange
      && changes.apiUrlProps.currentValue !== changes.apiUrlProps.previousValue;

    if (isApiUrlChanged) {
      this.fetchFeed();
    }
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }
}
