import { logoutAction } from './../../../auth/store/actions/sync.action';
import { CurrentUserInputInterface } from './../../../shared/types/currentUserInputInterface';
import { updateCurrentUserAction } from './../../../auth/store/actions/updateCurrentUser.action';
import { BackendErrorsInterface } from './../../../shared/types/backendErrors.interface';
import { filter } from 'rxjs/operators';
import { currentUserSelector } from './../../../auth/store/selectors';
import { Subscription, Observable } from 'rxjs';
import { CurrentUserInterface } from './../../../shared/types/currentUser.interface';
import { Store, select } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selectors';

@Component({
  selector: 'mc-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  currentUser!: CurrentUserInterface;
  currentUserSubscription!: Subscription;
  form!: FormGroup;
  isSubmitting$!: Observable<boolean>;
  backendErrors$!: Observable<BackendErrorsInterface | null>;

  constructor(private fb: FormBuilder, private store: Store) {}

  initializeForm(): void {
    const { image, username, bio, email } = this.currentUser;

    this.form = this.fb.group({
      image,
      username,
      bio,
      email,
      password: '',
    });
  }

  initializeListeners(): void {
    this.currentUserSubscription = this.store.pipe(
      select(currentUserSelector),
      filter(Boolean),
    ).subscribe((currentUser: CurrentUserInterface) => {
      this.currentUser = currentUser;
      this.initializeForm();
    });
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  onSubmit(): void {
    const currentUserInput: CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value,
    }
    this.store.dispatch(updateCurrentUserAction({ currentUserInput }));
  }

  onLogOut(): void {
    this.store.dispatch(logoutAction());
  }
}
