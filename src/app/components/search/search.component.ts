import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  fromEvent,
  filter,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs';
import { PokedexListService } from '../pokedex-list/pokedex-list.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @ViewChild('searchInput', { static: true })
  public searchInput!: ElementRef<HTMLInputElement>;

  public search: string = '';

  constructor(private pokedexListService: PokedexListService) {}

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(1000),
        distinctUntilChanged(),
        tap((text) => {
          this.onSearch();
        })
      )
      .subscribe();
  }

  public onSearch(): void {
    this.pokedexListService.queryFilter.search = this.search.toLowerCase();
    this.pokedexListService.onSearch();
  }
}
