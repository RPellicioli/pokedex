import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../loading/loading.service';
import { PokedexListService } from './pokedex-list.service';

@Component({
  selector: 'pokedex-list',
  templateUrl: './pokedex-list.component.html',
  styleUrls: ['./pokedex-list.component.scss'],
})
export class PokedexListComponent implements OnInit {
  constructor(
    public loadingService: LoadingService,
    public pokedexListService: PokedexListService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.loadingService.isLoading = true;

    this.pokedexListService.queryFilter.offset = 0;
    this.pokedexListService.queryFilter.limit = 12;

    await this.pokedexListService.loadPageInfos();

    this.loadingService.isLoading = false;
  }
}
