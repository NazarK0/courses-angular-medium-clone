import { isLoggedInSelector } from './../../../../../auth/store/selectors';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mc-feed-toggler',
  templateUrl: './feedToggler.component.html',
  styleUrls: ['./feedToggler.component.scss'],
})
export class FeedTogglerComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('tagName') tagNameProps: string | null = null;

  isLoggedIn$: Observable<boolean> = new Observable();

  constructor(private store: Store) {}

  initializeValues(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }

  ngOnInit(): void {
    this.initializeValues();
  }

}
