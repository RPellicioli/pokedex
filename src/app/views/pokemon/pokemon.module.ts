import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PokemonComponent } from './pokemon.component';
import { MostPopularModule } from '@app/components/most-popular/most-popular.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MostPopularModule,
    RouterModule.forChild([{ path: '', component: PokemonComponent }]),
  ],
  declarations: [PokemonComponent],
})
export class PokemonModule {}
