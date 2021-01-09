import { DeleteArticleEffect } from './store/effects/deleteArticle.effect';
import { TagListModule } from './../shared/modules/tagList/tagList.module';
import { LoadingModule } from '../shared/modules/loading/loading.module';
import { ErrorMessageModule } from '../shared/modules/errorMessage/errorMessage.module';
import { RouterModule } from '@angular/router';
import { ArticleService as SharedArticleService } from '../shared/services/article.service';
import { StoreModule } from '@ngrx/store';
import { GetArticleEffect } from './store/effects/getArticle.effect';
import { EffectsModule } from '@ngrx/effects';
import { ArticleComponent } from './components/article/article.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { reducers } from './store/reducers';
import { ArticleService } from './services/article.service';

const routes = [
  {
    path: 'articles/:slug',
    component: ArticleComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetArticleEffect, DeleteArticleEffect]),
    StoreModule.forFeature('article', reducers),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
    RouterModule.forChild(routes),
    TagListModule,
  ],
  declarations: [ArticleComponent],
  providers: [SharedArticleService, ArticleService],
})
export class ArticleModule {}
