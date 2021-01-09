import { BackendErrorMessagesModule } from './../backendErrorMessages/backendErrorMessages.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleFormComponent } from './components/articleForm/articleForm.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BackendErrorMessagesModule,
  ],
  declarations: [ArticleFormComponent],
  exports: [ArticleFormComponent],
})
export class ArticleFormModule {}
