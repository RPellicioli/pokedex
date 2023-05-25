import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isLoaded: boolean = false;

  constructor() {}

  public ngOnInit(): void {}

  public ngAfterViewInit() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 1500);
  }
}
