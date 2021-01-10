import { AddToFavoritesComponent } from './components/addToFavorites/addToFavorites.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule],
  declarations: [AddToFavoritesComponent],
  exports: [AddToFavoritesComponent],
})
export class AddToFavoritesModule {}
