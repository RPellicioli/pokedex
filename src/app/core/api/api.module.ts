import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule, HttpClientJsonpModule],
  providers: [],
})
export class ApiModule {}
