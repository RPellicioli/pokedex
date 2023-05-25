import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from '../card/card.module';
import { PokedexListComponent } from './pokedex-list.component';

@NgModule({
  imports: [CommonModule, TranslateModule, CardModule],
  declarations: [PokedexListComponent],
  exports: [PokedexListComponent],
})
export class PokedexListModule {}
