import { LoadingModule } from './../shared/modules/loading/loading.module';
import { GetArticleEffect } from './store/effects/getArticle.effect';
import { StoreModule } from '@ngrx/store';
import { UpdateArticleEffect } from './store/effects/updateArticle.effect';
import { EffectsModule } from '@ngrx/effects';
import { EditArticleService } from './services/editArticle.service';
import { ArticleFormModule } from '../shared/modules/articleForm/articleForm.module';
import { RouterModule } from '@angular/router';
import { EditArticleComponent } from './components/editArticle/editArticle.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { reducers } from './store/reducers';
import { ArticleService as SharedArticleService } from '../shared/services/article.service';

const routes = [
  {
    path: 'articles/:slug/edit',
    component: EditArticleComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    EffectsModule.forFeature([UpdateArticleEffect, GetArticleEffect]),
    StoreModule.forFeature('editArticle', reducers),
    LoadingModule,
  ],
  declarations: [EditArticleComponent],
  providers: [EditArticleService, SharedArticleService],
})
export class EditArticleModule {}
