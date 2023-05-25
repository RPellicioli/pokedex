import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../loading/loading.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public loadingService: LoadingService) {}

  public ngOnInit(): void {}

  public ngAfterViewInit() {}
}
