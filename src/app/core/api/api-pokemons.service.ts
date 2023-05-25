import { Injectable } from '@angular/core';
import { ApiBase } from './api-base';

@Injectable()
export class ApiPokemonsService extends ApiBase {
  protected routePath: string = 'pokemon';

  public getPokemons(
    params?: ApiBase.QueryFilter
  ): Promise<ApiBase.ListViewModel<ApiPokemonsService.ShortPokemon>> {
    return super.get<ApiBase.ListViewModel<ApiPokemonsService.ShortPokemon>>(
      '',
      {
        params: params as any,
      }
    );
  }

  public getPokemonBySlug(
    slug: number | string
  ): Promise<ApiPokemonsService.Pokemon> {
    return super.get<ApiPokemonsService.Pokemon>(`/${slug}`);
  }
}

export namespace ApiPokemonsService {
  export interface ShortPokemon {
    name: string;
    url: string;
  }

  export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
      back_default: string;
      back_female: string;
      back_shiny: string;
      back_shiny_female: string;
      front_default: string;
      front_female: string;
      front_shiny: string;
      front_shiny_female: string;
      other: {
        'official-artwork': {
          front_default: string;
          front_shiny: string;
        };
      };
    };
    stats: Stats[];
    types: {
      slot: number;
      type: {
        name: string;
      };
    }[];
  }

  export interface Stats {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }
}
