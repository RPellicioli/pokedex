import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from './card.component';

@NgModule({
  imports: [CommonModule, TranslateModule],
  declarations: [CardComponent],
  exports: [CardComponent],
})
export class CardModule {}
