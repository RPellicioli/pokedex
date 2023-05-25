import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ApiPokemonsService } from './api-pokemons.service';

@NgModule({
  imports: [HttpClientModule, HttpClientJsonpModule],
  providers: [ApiPokemonsService],
})
export class ApiModule {}
