import { TagListModule } from './../shared/modules/tagList/tagList.module';
import { LoadingModule } from '../shared/modules/loading/loading.module';
import { ErrorMessageModule } from '../shared/modules/errorMessage/errorMessage.module';
import { RouterModule } from '@angular/router';
import { ArticleService as SharedArticleService } from '../shared/services/atricle.service';
import { StoreModule } from '@ngrx/store';
import { GetArticleEffect } from './store/effects/getArticle.effect';
import { EffectsModule } from '@ngrx/effects';
import { ArticleComponent } from './components/article/article.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { reducers } from './store/reducers';

const routes = [
  {
    path: 'articles/:slug',
    component: ArticleComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetArticleEffect]),
    StoreModule.forFeature('article', reducers),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
    RouterModule.forChild(routes),
    TagListModule,
  ],
  declarations: [ArticleComponent],
  providers: [SharedArticleService],
})
export class ArticleModule {}
