import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@app/components/loading/loading.service';
import { ApiPokemonSpeciesService } from '@app/core/api/api-pokemon-species.service';
import { ApiPokemonsService } from '@app/core/api/api-pokemons.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent {
  public pokemon!: ApiPokemonsService.Pokemon;
  public pokemonSpecie!: ApiPokemonSpeciesService.PokemonSpecie;
  public typeColors = typeColors;

  constructor(
    public loadingService: LoadingService,
    private apiPokemonsService: ApiPokemonsService,
    private apiPokemonSpeciesService: ApiPokemonSpeciesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public async ngOnInit(): Promise<void> {
    this.loadingService.isLoading = true;

    this.activatedRoute.params.subscribe(async (q) => {
      await Promise.all([
        this.loadPokemonBySlug(q['slug']),
        this.loadPokemonSpecieBySlug(q['slug']),
      ]);

      if (!this.pokemon) {
        this.loadingService.isLoading = false;
        this.router.navigate(['/']);
      }

      this.loadingService.isLoading = false;
    });
  }

  public async loadPokemonBySlug(slug: string): Promise<void> {
    try {
      this.pokemon = await this.apiPokemonsService.getPokemonBySlug(slug);
    } catch (error) {
      console.log(error);
    }
  }

  public async loadPokemonSpecieBySlug(slug: string): Promise<void> {
    try {
      this.pokemonSpecie = await this.apiPokemonSpeciesService.getPokemonBySlug(
        slug
      );
    } catch (error) {
      console.log(error);
    }
  }

  public getStats(type: string): string {
    if (!this.pokemon) return '';

    const stat = this.pokemon.stats.find((s) => s.stat.name == type);

    if (stat) {
      return stat.base_stat * 2 + 'px';
    }

    return '0px';
  }

  public getDescription(): string {
    if (!this.pokemonSpecie) return '';

    const text = this.pokemonSpecie.flavor_text_entries.find(
      (s) => s.language.name == 'en'
    );

    if (text) {
      return text.flavor_text;
    }

    return '';
  }
}

export const typeColors: ApiPokemonSpeciesService.TypeColorsType = {
  flying: {
    text: '#91e0ff',
    bg: '#0e4b78',
  },
  bug: {
    text: '#46a047',
    bg: '#e8e95f',
  },
  ice: {
    text: '#1aafe1',
    bg: '#c9eafa',
  },
  electric: {
    text: '#d87a00',
    bg: '#ffcb08',
  },
  fighting: {
    text: '#8f191b',
    bg: '#d85355',
  },
  dark: {
    text: '#f58c1f',
    bg: '#4c3943',
  },
  dragon: {
    text: '#2f2f2f',
    bg: '#f7694b',
  },
  fire: {
    text: '#8f191b',
    bg: '#ffa36a',
  },
  ground: {
    text: '#5b3513',
    bg: '#b56528',
  },
  grass: {
    text: '#e8e95f',
    bg: '#42710f',
  },
  normal: {
    text: '#914f22',
    bg: '#e3a475',
  },
  poison: {
    text: '#8f191b',
    bg: '#fb6568',
  },
  psychic: {
    text: '#b11f83',
    bg: '#fa71cf',
  },
  rock: {
    text: '#533e29',
    bg: '#ba9c80',
  },
  steel: {
    text: '#5b3513',
    bg: '#d5cec5',
  },
  water: {
    text: '#1487b4',
    bg: '#77ccf5',
  },
  ghost: {
    text: '#e5e8ea',
    bg: '#927798',
  },
  fairy: {
    text: '#1487b4',
    bg: '#fbefb7',
  },
};
