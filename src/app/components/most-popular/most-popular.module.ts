import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MostPopularComponent } from './most-popular.component';
import { CardModule } from '../card/card.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  imports: [CommonModule, TranslateModule, CardModule, SlickCarouselModule],
  declarations: [MostPopularComponent],
  exports: [MostPopularComponent],
})
export class MostPopularModule {}
