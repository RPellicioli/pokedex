import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public loading: boolean = false;

  constructor() {}

  public ngOnInit(): void {}

  public ngAfterViewInit() {}
}
