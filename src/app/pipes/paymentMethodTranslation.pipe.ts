import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentMethodTranslation'
})
export class PaymentMethodTranslationPipe implements PipeTransform {
  transform(value: string): string {
    switch(value) {
      case 'PIX':
        return 'Pix';
      case 'DEBIT_CARD':
        return 'Débito';
      case 'CREDIT_CARD':
        return 'Crédito';
      default:
        return value; // Retorna o valor original caso não encontre uma correspondência
    }
  }
}