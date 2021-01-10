import { StoreModule } from '@ngrx/store';
import { CreateArticleEffect } from './store/effects/createArticle.effect';
import { EffectsModule } from '@ngrx/effects';
import { CreateArticleService } from './services/createArticle.service';
import { ArticleFormModule } from './../shared/modules/articleForm/articleForm.module';
import { RouterModule } from '@angular/router';
import { CreateArticleComponent } from './components/createArticle/createArticle.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { reducers } from './store/reducers';

const routes = [
  {
    path: 'articles/new',
    component: CreateArticleComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    EffectsModule.forFeature([CreateArticleEffect]),
    StoreModule.forFeature('createArticle', reducers)
  ],
  declarations: [CreateArticleComponent],
  providers: [CreateArticleService],
})
export class CreateArticleModule {}
