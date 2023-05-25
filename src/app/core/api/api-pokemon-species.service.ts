import { Injectable } from '@angular/core';
import { ApiBase } from './api-base';

@Injectable()
export class ApiPokemonSpeciesService extends ApiBase {
  protected routePath: string = 'pokemon-species';

  public getPokemonBySlug(
    slug: number | string
  ): Promise<ApiPokemonSpeciesService.PokemonSpecie> {
    return super.get<ApiPokemonSpeciesService.PokemonSpecie>(`/${slug}`);
  }
}

export namespace ApiPokemonSpeciesService {
  export interface PokemonSpecie {
    flavor_text_entries: {
      flavor_text: string;
      language: { name: string; url: string };
    }[];
  }

  export enum TypesEnum {
    BUG = 'bug',
    DARK = 'dark',
    DRAGON = 'dragon',
    ELECTRIC = 'electric',
    FAIRY = 'fairy',
    FIGHTING = 'fighting',
    FIRE = 'fire',
    FLYING = 'flying',
    GHOST = 'ghost',
    GRASS = 'grass',
    GROUND = 'ground',
    ICE = 'ice',
    NORMAL = 'normal',
    POISON = 'poison',
    PSYCHIC = 'psychic',
    ROCK = 'rock',
    STEEL = 'steel',
    WATER = 'water',
  }

  export type TypeColorsType = {
    [key: string]: {
      bg: string;
      text: string;
    };
  };
}
