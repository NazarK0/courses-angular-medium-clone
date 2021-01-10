import { popularTagsSelector, isLoadingSelector, errorSelector } from './../../store/selectors';
import { Observable } from 'rxjs';
import { getPopularTagsAction } from './../../store/actions/getPopularTags.action';
import { Store, select } from '@ngrx/store';
import { PopularTagType } from './../../../../types/popularTag.type';
import { Component, Input, OnInit } from '@angular/core';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popularTags.component.html',
  styleUrls: ['./popularTags.component.scss'],
})
export class PopularTagsComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  popularTags$: Observable<PopularTagType[] | null> = new Observable<PopularTagType[] | null>();
  isLoading$: Observable<boolean> = new Observable<boolean>();
  error$: Observable<string | null> = new Observable<string | null>();

  constructor(
    private store: Store<AppStateInterface>,

  ) {}

  initializeValues(): void {
    this.popularTags$ = this.store.pipe(select(popularTagsSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
  }

  fetchData(): void {
    this.store.dispatch(getPopularTagsAction());
  }

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }
}
