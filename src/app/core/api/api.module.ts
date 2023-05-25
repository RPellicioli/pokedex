import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ApiPokemonsService } from './api-pokemons.service';
import { ApiPokemonSpeciesService } from './api-pokemon-species.service';

@NgModule({
  imports: [HttpClientModule, HttpClientJsonpModule],
  providers: [ApiPokemonsService, ApiPokemonSpeciesService],
})
export class ApiModule {}
