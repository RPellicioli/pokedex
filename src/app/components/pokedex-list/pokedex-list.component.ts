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
  public isLoading: boolean = false;
  public shortPokemons: ApiPokemonsService.ShortPokemon[] = [];
  public pokemons: ApiPokemonsService.Pokemon[] = [];
  public queryFilter: ApiBase.QueryFilter = new ApiBase.QueryFilter();
  public pagination: PokedexListComponent.Pagination =
    new PokedexListComponent.Pagination();

  constructor(
    private apiPokemonsService: ApiPokemonsService,
    public loadingService: LoadingService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.loadingService.isLoading = true;

    this.queryFilter.offset = 0;
    this.queryFilter.limit = 12;

    await this.loadPageInfos();

    this.loadingService.isLoading = false;
  }

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

export namespace PokedexListComponent {
  export class Pagination {
    previous: string = '';
    next: string = '';
    count: number = 0;
  }
}
