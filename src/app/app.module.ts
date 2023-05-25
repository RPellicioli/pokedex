import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { TranslationLoaderService } from './services/translation-loader.service';
import { CultureService } from './services/culture.service';
import { RequestInterceptorService } from './services/request-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ApiModule } from './core/api/api.module';
import { HeaderModule } from './components/header/header.module';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ApiModule,
    HeaderModule,
    TranslateModule.forRoot(),
  ],
  providers: [
    TranslationLoaderService,
    CultureService,
    { provide: LOCALE_ID, useValue: 'pt' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
