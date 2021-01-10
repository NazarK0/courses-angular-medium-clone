import { AddToFavoritesEffect } from './store/effects/addToFavorites.effect';
import { EffectsModule } from '@ngrx/effects';
import { AddToFavoritesService } from './services/addToFavorites.service';
import { AddToFavoritesComponent } from './components/addToFavorites/addToFavorites.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([AddToFavoritesEffect])],
  declarations: [AddToFavoritesComponent],
  exports: [AddToFavoritesComponent],
  providers: [AddToFavoritesService],
})
export class AddToFavoritesModule {}
