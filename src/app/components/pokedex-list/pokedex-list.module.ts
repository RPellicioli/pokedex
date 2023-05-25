import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from '../card/card.module';
import { PokedexListComponent } from './pokedex-list.component';
import { LoadingModule } from '../loading/loading.module';

@NgModule({
  imports: [CommonModule, TranslateModule, CardModule, LoadingModule],
  declarations: [PokedexListComponent],
  exports: [PokedexListComponent],
})
export class PokedexListModule {}
