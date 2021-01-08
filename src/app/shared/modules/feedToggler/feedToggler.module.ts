import { RouterModule } from '@angular/router';
import { FeedTogglerComponent } from './components/feedToggler/feedToggler.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [FeedTogglerComponent],
  exports: [FeedTogglerComponent],
})
export class FeedTogglerModule{}
