import { isLoggedInSelector, isAnonymousSelector, currentUserSelector } from './../../../../../auth/store/selectors';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mc-top-bar',
  templateUrl: './topBar.component.html',
  styleUrls: ['./topBar.component.scss']
})
export class TopBarComponent implements OnInit {
  isLoggedIn$: Observable<boolean | null> = new Observable();
  isAnonymous$: Observable<boolean> = new Observable();
  currentUser$: Observable<CurrentUserInterface | null> = new Observable();

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector));
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
  }
}
