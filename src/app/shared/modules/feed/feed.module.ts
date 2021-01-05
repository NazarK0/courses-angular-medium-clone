import { PaginationModule } from './../pagination/pagination.module';
import { LoadingModule } from './../loading/loading.module';
import { ErrorMessageModule } from './../errorMessage/errorMessage.module';
import { RouterModule } from '@angular/router';
import { FeedService } from './services/feed.service';
import { StoreModule } from '@ngrx/store';
import { GetFeedEffect } from './store/effects/getFeed.effect';
import { EffectsModule } from '@ngrx/effects';
import { FeedComponent } from './components/feed/feed.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { reducers } from './store/reducers';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetFeedEffect]),
    StoreModule.forFeature('feed', reducers),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
    PaginationModule,
  ],
  declarations: [FeedComponent],
  providers: [FeedService],
  exports: [FeedComponent],
})
export class FeedModule {}
