import { ActivatedRoute, Params, Router } from '@angular/router';
import { isLoadingSelector, errorSelector, feedSelector } from './../../store/selectors';
import { GetFeedResponseInterface } from './../../types/getFeedResponse.interface';
import { Observable, Subscription } from 'rxjs';
import { getFeedAction } from './../../store/actions/getFeed.action';
import { Store, select } from '@ngrx/store';
import { Input, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line: no-input-rename
  @Input('apiUrl') apiUrlProps: string;

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

  fetchData(): void {
    this.store.dispatch(getFeedAction({ url: this.apiUrlProps }));
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route
      .queryParams
      .subscribe((params: Params) => {
        this.currentPage = Number(params.page || '1') ;
      });
  }

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }
}
