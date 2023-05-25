import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { CaseInsensitiveMatcher } from '@app/utils/case-insensitive-matcher';
import { TranslationLoader } from '@app/utils/translation-loader';
import { locale as localePtBr } from '@app/i18n/pt-BR';
import { locale as localeEnUs } from '@app/i18n/en-US';
import { locale as localeEsPy } from '@app/i18n/es-PY';

export function TranslationLoaderFactory() {
  return new TranslationLoader(localePtBr, localeEnUs, localeEsPy);
}

const ptBrUrls = localePtBr.data.URLs;
const esPyUrls = localeEsPy.data.URLs;
const enUsUrls = localeEnUs.data.URLs;

const routes: Routes = [
  <Route>{
    matcher: CaseInsensitiveMatcher.matcher,
    matcherPath: [
      ptBrUrls.Pokemon.Url + '/:slug',
      esPyUrls.Pokemon.Url + '/:slug',
      enUsUrls.Pokemon.Url + '/:slug',
    ],
    loadChildren: () =>
      import('./views/pokemon/pokemon.module').then((m) => m.PokemonModule),
  },
  <Route>{
    path: '',
    loadChildren: () =>
      import('./views/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
