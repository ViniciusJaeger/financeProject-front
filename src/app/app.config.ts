import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { CommonModule, registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { PaymentMethodTranslationPipe } from './shared/pipes/paymentMethodTranslation.pipe';
import { MatDialog } from '@angular/material/dialog';
import { pt_BR, provideNzI18n } from 'ng-zorro-antd/i18n';
import pt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

registerLocaleData(pt);

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimations(), CommonModule, provideHttpClient(), PaymentMethodTranslationPipe, MatDialog, provideNzI18n(pt_BR), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient()]
};

