import { CurrentUserInterface } from './../../../shared/types/currentUser.interface';
import { AuthSevice } from './../../services/auth.service';
import { isSubmittingSelector } from './../../store/selectors';
import { registerAction } from './../../store/actions/register.action';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  isSubmitting$: Observable<boolean>;

  constructor(private fb: FormBuilder, private store: Store, private authService: AuthSevice) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeForm(): void {
    this.form  = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store
      .pipe(
        select(isSubmittingSelector)
      );
  }

  onSubmit(): void {
    this.store.dispatch(registerAction(this.form.value));
    this.authService.register(this.form.value)
      .subscribe((currentUser: CurrentUserInterface) => { console.log(currentUser, 'currentUser')} );
  }
}
