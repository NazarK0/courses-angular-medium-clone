import { AppStateInterface } from './../../../shared/types/appState.interface';
import { loginAction } from './../../store/actions/login.action';
import { LoginRequestInterface } from './../../types/loginRequest.interface';
import { isSubmittingSelector, validationErrorsSelector } from './../../store/selectors';
import { Store, select } from '@ngrx/store';
import { BackendErrorsInterface } from './../../../shared/types/backendErrors.interface';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  isSubmitting$: Observable<boolean> = new Observable();
  backendErrors$: Observable<BackendErrorsInterface | null> = new Observable();

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {}

  initializeForm(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],

    });
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store
      .pipe(
        select(isSubmittingSelector)
      );

    this.backendErrors$ = this.store
      .pipe(
        select(validationErrorsSelector)
      );
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  onSubmit(): void {
    const request: LoginRequestInterface = {
      user: this.form.value,
    };

    this.store.dispatch(loginAction({ request }));
  }
}