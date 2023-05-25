import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule],
  declarations: [SearchComponent],
  exports: [SearchComponent],
})
export class SearchModule {}
