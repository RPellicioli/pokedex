import { Component, Input, OnInit } from '@angular/core';
import { ApiPokemonsService } from '@app/core/api/api-pokemons.service';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() public pokemon!: ApiPokemonsService.Pokemon;

  constructor() {}

  public ngOnInit(): void {}
}
