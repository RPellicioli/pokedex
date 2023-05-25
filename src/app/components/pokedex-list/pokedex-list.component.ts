import { Component, OnInit } from '@angular/core';
import { ApiBase } from '@app/core/api/api-base';
import { ApiPokemonsService } from '@app/core/api/api-pokemons.service';
import { LoadingService } from '../loading/loading.service';

@Component({
  selector: 'pokedex-list',
  templateUrl: './pokedex-list.component.html',
  styleUrls: ['./pokedex-list.component.scss'],
})
export class PokedexListComponent implements OnInit {
  public shortPokemons: ApiPokemonsService.ShortPokemon[] = [];
  public pokemons: ApiPokemonsService.Pokemon[] = [];

  constructor(
    private apiPokemonsService: ApiPokemonsService,
    public loadingService: LoadingService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.loadingService.isLoading = true;

    await this.loadPokemons();

    if (this.shortPokemons && this.shortPokemons.length > 0) {
      await Promise.all(
        this.shortPokemons.map(async (p) => {
          await this.loadPokemonBySlug(p.name);
        })
      );
    }

    this.loadingService.isLoading = false;
  }

  public async loadPokemons(): Promise<void> {
    try {
      const queryFilter = new ApiBase.QueryFilter();
      queryFilter.offset = 0;
      queryFilter.limit = 12;

      const response = await this.apiPokemonsService.getPokemons(queryFilter);

      this.shortPokemons = response.results;
    } catch (error) {
      console.log(error);
    }
  }

  public async loadPokemonBySlug(slug: string): Promise<void> {
    try {
      const response = await this.apiPokemonsService.getPokemonBySlug(slug);

      this.pokemons.push(response);
    } catch (error) {
      console.log(error);
    }
  }
}
