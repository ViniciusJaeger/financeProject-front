import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ExpenseService } from '../service/expense.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Expense } from '../model/Expense';

@Component({
  selector: 'app-finance-delete-dialog',
  imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatDialogTitle,
        MatSnackBarModule,
        MatDatepickerModule
  ],
  templateUrl: './finance-delete-dialog.component.html',
  styleUrl: './finance-delete-dialog.component.scss'
})
export class FinanceDeleteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<FinanceDeleteDialogComponent>);
  data = inject<Expense>(MAT_DIALOG_DATA);


  constructor(private _expenseService: ExpenseService, private _snackBar: MatSnackBar, private _dialog: MatDialog) {
    }

  onCancel(){
    this.dialogRef.close();
  }

  onDelete(){
    this._expenseService.deleteExpense(this.data.id).subscribe(result => this.OnSucessDelete());
  }

  private OnSucessDelete() {
    this._snackBar.open('Despesa removida com sucesso!', '', { duration: 5000 });
    this._dialog.closeAll();
  }
}
