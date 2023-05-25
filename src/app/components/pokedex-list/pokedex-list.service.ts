import { Injectable } from '@angular/core';
import { ApiBase } from '@app/core/api/api-base';
import { ApiPokemonsService } from '@app/core/api/api-pokemons.service';

@Injectable()
export class PokedexListService {
  public isLoading: boolean = false;
  public shortPokemons: ApiPokemonsService.ShortPokemon[] = [];
  public pokemons: ApiPokemonsService.Pokemon[] = [];
  public queryFilter: ApiBase.QueryFilter = new ApiBase.QueryFilter();
  public pagination: PokedexListService.Pagination =
    new PokedexListService.Pagination();

  constructor(private apiPokemonsService: ApiPokemonsService) {}

  public async loadPageInfos(): Promise<void> {
    this.isLoading = true;

    await this.loadPokemons();

    if (this.shortPokemons && this.shortPokemons.length > 0) {
      await Promise.all(
        this.shortPokemons.map(async (p) => {
          await this.loadPokemonBySlug(p.name);
        })
      );
    }

    this.isLoading = false;
  }

  public async loadPokemons(): Promise<void> {
    try {
      const response = await this.apiPokemonsService.getPokemons(
        this.queryFilter
      );

      this.shortPokemons = response.results;
      this.updatePagination(response);
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

  public async next(): Promise<void> {
    this.queryFilter.offset += 12;
    this.pokemons = [];

    await this.loadPageInfos();
  }

  public async previous(): Promise<void> {
    this.queryFilter.offset -= 12;
    this.pokemons = [];

    await this.loadPageInfos();
  }

  public async onSearch(): Promise<void> {
    this.resetPagination();
    this.pokemons = [];

    this.isLoading = true;
    await this.loadPokemonBySlug(this.queryFilter.search);
    this.isLoading = false;
  }

  private resetPagination(): void {
    this.pagination = {
      count: 0,
      next: '',
      previous: '',
    };
  }

  private updatePagination(model: ApiBase.ListViewModel<any>): void {
    this.pagination.count = model.count;
    this.pagination.next = model.next;
    this.pagination.previous = model.previous;
  }
}

export namespace PokedexListService {
  export class Pagination {
    previous: string = '';
    next: string = '';
    count: number = 0;
  }
}
