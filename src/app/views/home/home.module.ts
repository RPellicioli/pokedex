import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './home.component';
import { CardModule } from '@app/components/card/card.module';
import { LoadingModule } from '@app/components/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CardModule,
    LoadingModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
