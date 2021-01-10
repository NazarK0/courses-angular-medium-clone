import { CurrentUserInterface } from './../../../shared/types/currentUser.interface';
import { userProfileSelector } from './../../store/selectors';
import { filter, map } from 'rxjs/operators';
import { currentUserSelector } from './../../../auth/store/selectors';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { getUserProfileAction } from './../../store/actions/getUserProfile.action';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { ProfileInterface } from './../../../shared/types/profile.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { errorSelector, isLoadingSelector } from '../../store/selectors';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
@Component({
  selector: 'mc-user-profile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./userProfile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy{
  userProfile!: ProfileInterface;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  userProfileSubscription!: Subscription;
  slug!: string;
  apiUrl!: string;
  isCurrentUserProfile$!: Observable<boolean>;

  constructor(
    private store: Store<AppStateInterface>,
    private route: ActivatedRoute,
    private router: Router,
    ) {}

  fetchData(): void {
    this.store.dispatch(getUserProfileAction({ slug: this.slug }));
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') || '';
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isCurrentUserProfile$ = combineLatest([
      this.store.pipe(select(currentUserSelector), filter<CurrentUserInterface | null>(Boolean)),
      this.store.pipe(select(userProfileSelector), filter<ProfileInterface | null>(Boolean)),
    ]).pipe(
      map(([currentUser, userProfile]: [CurrentUserInterface | null, ProfileInterface | null]) => {
        return currentUser?.username === userProfile?.username;
      })
    );
  }

  initializeListeners(): void {
    this.userProfileSubscription = this.store.pipe(
      select(userProfileSelector),
    ).subscribe((userProfile: ProfileInterface | null) => {
      if(userProfile) {
        this.userProfile = userProfile;
      }
    });

    this.route.params.subscribe((params: Params) => {
      this.slug = params.slug;
      this.fetchData();
    });
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');

    return isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?atuhor=${this.slug}`;
  }

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe();
  }
}
