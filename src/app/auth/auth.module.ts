import { AuthSevice } from './services/auth.service';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { RegisterComponent } from './components/register/register.component';
import { reducer } from './store/reducers';


const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  }
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducer)],
  declarations: [RegisterComponent],
  providers: [AuthSevice],
})
export class AuthModule {}
