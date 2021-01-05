import { BannerComponent } from './components/banner/banner.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule],
  declarations: [BannerComponent],
  exports: [BannerComponent],
})
export class BannerModule { }
