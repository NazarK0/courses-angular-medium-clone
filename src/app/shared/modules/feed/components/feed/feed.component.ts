import { isLoadingSelector, errorSelector, feedSelector } from './../../store/selectors';
import { GetFeedResponseInterface } from './../../types/getFeedResponse.interface';
import { Observable } from 'rxjs';
import { getFeedAction } from './../../store/actions/getFeed.action';
import { Store, select } from '@ngrx/store';
import { Input, OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('apiUrl') apiUrlProps: string;

  isLoading$: Observable<boolean> = new Observable();
  error$: Observable<string | null> = new Observable();
  feed$: Observable<GetFeedResponseInterface | null> = new Observable();

  constructor(private store: Store) {}

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.feed$ = this.store.pipe(select(feedSelector));
  }

  fetchData(): void {
    this.store.dispatch(getFeedAction({ url: this.apiUrlProps }));
  }

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }
}
