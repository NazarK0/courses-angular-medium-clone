import { tagListComponent } from './components/tagList/tagList.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule],
  declarations: [tagListComponent],
  exports: [tagListComponent],
})
export class TagListModule {}
