import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from './card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, TranslateModule, RouterModule],
  declarations: [CardComponent],
  exports: [CardComponent],
})
export class CardModule {}
