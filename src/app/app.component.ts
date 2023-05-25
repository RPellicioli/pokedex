import { Component } from '@angular/core';
import { CultureService } from './services/culture.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationLoaderService } from './services/translation-loader.service';
import { locale as localePtBr } from './i18n/pt-BR';
import { locale as localeEnUs } from './i18n/en-US';
import { locale as localeEsPy } from './i18n/es-PY';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public translationLoaderService: TranslationLoaderService,
    public translateService: TranslateService,
    public cultureService: CultureService
  ) {
    translateService.setDefaultLang('pt-BR');
    translateService.use(cultureService.currentCulture);
    translationLoaderService.loadTranslations(
      localePtBr,
      localeEnUs,
      localeEsPy
    );

    cultureService.onCultureChanged.subscribe((lang) => {
      translateService.use(lang);
    });
  }

  public ngOnInit(): void {}
}
