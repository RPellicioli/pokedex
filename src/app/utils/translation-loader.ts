import { TranslateLoader } from "@ngx-translate/core";
import { Observable, of } from "rxjs";

export interface Locale { lang: string; data: Object; }

export class TranslationLoader implements TranslateLoader {
  private locales: Locale[];

  constructor(...args: Locale[]) {
    this.locales = args;
  }

  public getTranslation(lang: string): Observable<any> {
    const locale = this.locales.find(l => l.lang == lang);
    let data = locale ? locale.data : this.locales[0].data;
    
    return of(data);
  }
}

