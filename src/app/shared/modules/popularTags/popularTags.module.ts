import { RouterModule } from '@angular/router';
import { ErrorMessageModule } from './../errorMessage/errorMessage.module';
import { LoadingModule } from './../loading/loading.module';
import { StoreModule } from '@ngrx/store';
import { GetPopularTagsEffect } from './store/effects/getPopularTags.effect';
import { EffectsModule } from '@ngrx/effects';
import { PopularTagsService } from './services/popularTags.service';
import { PopularTagsComponent } from './components/popularTags/popularTags.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { reducers } from './store/reducers';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetPopularTagsEffect]),
    StoreModule.forFeature('popularTags', reducers),
    LoadingModule,
    ErrorMessageModule,
    RouterModule,
  ],
  declarations: [PopularTagsComponent],
  providers: [PopularTagsService],
  exports: [PopularTagsComponent],
})
export class PopularTagsModule {}
