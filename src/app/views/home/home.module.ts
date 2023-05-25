import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './home.component';
import { CardModule } from '@app/components/card/card.module';
import { MostPopularModule } from '@app/components/most-popular/most-popular.module';
import { PokedexListModule } from '@app/components/pokedex-list/pokedex-list.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CardModule,
    MostPopularModule,
    PokedexListModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
