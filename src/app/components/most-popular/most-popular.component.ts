import { Component, OnInit } from '@angular/core';
import { ApiBase } from '@app/core/api/api-base';
import { ApiPokemonsService } from '@app/core/api/api-pokemons.service';
import { LoadingService } from '../loading/loading.service';

@Component({
  selector: 'most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.scss'],
})
export class MostPopularComponent implements OnInit {
  //Slider
  public slickConfig = {
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: false,
    fade: false,
    dots: false,
    arrows: true,
    draggable: true,
    speed: 600,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          arrows: true,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          arrows: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };

  public shortPokemons: ApiPokemonsService.ShortPokemon[] = [];
  public pokemons: ApiPokemonsService.Pokemon[] = [];
  public loaded: boolean = false;

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

    this.loaded = true;
    this.loadingService.isLoading = false;
  }

  public async loadPokemons(): Promise<void> {
    try {
      const queryFilter = new ApiBase.QueryFilter();
      queryFilter.offset = 60;
      queryFilter.limit = 20;

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
