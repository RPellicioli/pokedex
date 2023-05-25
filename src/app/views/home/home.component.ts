import { Component } from '@angular/core';
import { PokedexListService } from '@app/components/pokedex-list/pokedex-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(public pokedexListService: PokedexListService) {}

  public ngOnInit(): void {}
}
