import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/es-AR';

registerLocaleData(localeAr); 

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'es-AR' },
    importProvidersFrom([
      HttpClientModule
    ])
  ]
};
