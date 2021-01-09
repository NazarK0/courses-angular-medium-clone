import { FeedTogglerModule } from '../shared/modules/feedToggler/feedToggler.module';
import { PopularTagsModule } from '../shared/modules/popularTags/popularTags.module';
import { BannerModule } from '../shared/modules/banner/banner.module';
import { FeedModule } from '../shared/modules/feed/feed.module';
import { Routes, RouterModule } from '@angular/router';
import { TagFeedComponent } from './components/tagFeed/tagFeed.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'tags/:slug',
    component: TagFeedComponent
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
  declarations: [TagFeedComponent],
  providers: []
})
export class TagFeedModule {}
