import { FeedTogglerModule } from '../shared/modules/feedToggler/feedToggler.module';
import { PopularTagsModule } from '../shared/modules/popularTags/popularTags.module';
import { BannerModule } from '../shared/modules/banner/banner.module';
import { FeedModule } from '../shared/modules/feed/feed.module';
import { Routes, RouterModule } from '@angular/router';
import { YourFeedComponent } from './components/yourFeed/yourFeed.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'feed',
    component: YourFeedComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeedModule,
    BannerModule,
    PopularTagsModule,
    FeedTogglerModule,
  ],
  declarations: [YourFeedComponent],
  providers: []
})
export class YourFeedModule {}
