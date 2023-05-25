import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { TranslationLoaderService } from './services/translation-loader.service';
import { CultureService } from './services/culture.service';
import { TranslateModule } from '@ngx-translate/core';
import { ApiModule } from './core/api/api.module';
import { HeaderModule } from './components/header/header.module';
import { LoadingModule } from './components/loading/loading.module';
import { LoadingService } from './components/loading/loading.service';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ApiModule,
    HeaderModule,
    LoadingModule,
    TranslateModule.forRoot(),
  ],
  providers: [
    TranslationLoaderService,
    CultureService,
    LoadingService,
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
