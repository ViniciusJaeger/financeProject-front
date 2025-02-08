import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { PaymentMethodTranslationPipe } from './pipes/paymentMethodTranslation.pipe';
import { MatDialog } from '@angular/material/dialog';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimations(), CommonModule, provideHttpClient(), PaymentMethodTranslationPipe, MatDialog]
};

