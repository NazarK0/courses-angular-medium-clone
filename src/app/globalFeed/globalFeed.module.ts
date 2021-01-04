import { FeedModule } from './../shared/modules/feed/feed.module';
import { Routes, RouterModule } from '@angular/router';
import { GlobalFeedComponent } from './components/globalFeed/globalFeed.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: GlobalFeedComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeedModule,
  ],
  declarations: [GlobalFeedComponent],
  providers: []
})
export class GlobalFeedModule {}
