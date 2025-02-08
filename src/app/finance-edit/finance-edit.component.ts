import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Expense } from '../model/Expense';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseService } from '../service/expense.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { PaymentMethod } from '../enums/PaymentMethod';


@Component({
  selector: 'app-finance-edit',
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogTitle,
    MatSnackBarModule,
    MatDatepickerModule
  ],
  templateUrl: './finance-edit.component.html',
  styleUrl: './finance-edit.component.scss'
})
export class FinanceEditComponent {
  readonly dialogRef = inject(MatDialogRef<FinanceEditComponent>);
  data = inject<Expense>(MAT_DIALOG_DATA);

  expenseForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _expenseService: ExpenseService, private _snackBar: MatSnackBar, private _dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.expenseForm = this._formBuilder.group({
      id: [this.data.id || ''],
      date: [new Date(this.data.date) || '', Validators.required],
      paymentMethod: [this.data.paymentMethod || '', Validators.required],
      activity: [this.data.activity || '', Validators.required],
      entrances: [this.data.entrances || 0, Validators.required],
      bills: [this.data.bills || 0, Validators.required]
    })
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      const paymentStringValue = this.expenseForm.get('paymentMethod')?.value.toLowerCase();
      let paymentEnumValue = null;

      if(paymentStringValue === 'crédito'){
         paymentEnumValue =PaymentMethod.CREDIT_CARD;
      } else if(paymentStringValue === 'débito'){
        paymentEnumValue =PaymentMethod.DEBIT_CARD;
      } else {
        paymentEnumValue =PaymentMethod.PIX;
      }
      
      this.expenseForm.get('paymentMethod')?.setValue(paymentEnumValue);
      this._expenseService.updateExpense(this.expenseForm.value).subscribe(result => this.OnSucessUpdate())
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private OnSucessUpdate() {
    this._snackBar.open('Despesa alterada com sucesso!', '', { duration: 5000 });
    this._dialog.closeAll();
  }
}
