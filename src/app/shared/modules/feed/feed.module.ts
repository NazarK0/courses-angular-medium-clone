import { FeedComponent } from './components/feed/feed.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FeedComponent],
  providers: [],
  exports: [FeedComponent],
})
export class FeedModule {}
