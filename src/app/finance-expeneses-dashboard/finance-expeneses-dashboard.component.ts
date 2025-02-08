import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ExpenseService } from '../service/expense.service';
import { PaymentMethodTranslationPipe } from '../pipes/paymentMethodTranslation.pipe';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ExpensePerMonth } from '../model/ExpensesPerMonth';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FinanceEditComponent } from '../finance-edit/finance-edit.component';
import { Expense } from '../model/Expense';
import { FinanceDeleteDialogComponent } from '../finance-delete-dialog/finance-delete-dialog.component';
import { FinanceAddSheetComponent } from '../finance-add-sheet/finance-add-sheet.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-finance-expeneses-dashboard',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    PaymentMethodTranslationPipe,
    CommonModule,
    SearchComponent,
    MatExpansionModule,
    MatCheckboxModule,
    MatDatepickerModule
  ],
  templateUrl: './finance-expeneses-dashboard.component.html',
  styleUrl: './finance-expeneses-dashboard.component.scss'
})
export class FinanceExpenesesDashboardComponent {
  expenses: ExpensePerMonth[] = [];
  searchText: string = '';
  totalEntrancesPerMonth: number = 0;
  totalBillsPerMonth: number = 0;
  pix: boolean = false;
  displayedColumns: string[] = ['dateOfPurchase', 'paymentMethod', 'activity', 'entrances', 'bills', 'edit-delete'];
  paymentMethodChecked: string[] = [];

  constructor(private expenseService: ExpenseService, private _formBuilder: FormBuilder, private _matDialog: MatDialog, private _paymentMethodTranslationPipe: PaymentMethodTranslationPipe) {
    this.expenseService.list().subscribe(expenses =>
      this.expenses = expenses
    );
  }

  openDialog(expenseDetail: Expense): void {
    const paymentMethodString = expenseDetail.paymentMethod.toString();
    const translatePaymentMethod = this._paymentMethodTranslationPipe.transform(paymentMethodString)
    this._matDialog.open(FinanceEditComponent, {
      data: {
        id: expenseDetail.id,
        date: expenseDetail.date,
        paymentMethod: translatePaymentMethod,
        activity: expenseDetail.activity,
        entrances: expenseDetail.entrances,
        bills: expenseDetail.bills
      }
    });
  }

  ngOnInit(): void {
    this.expenseService.list().subscribe({
      next: (expenses) => {
        this.expenses = expenses;

        expenses.forEach(element => {
          element.expenseDetailVO.forEach(value => {
            this.totalEntrancesPerMonth += value.entrances;
            this.totalBillsPerMonth += value.bills;
          })
        })
      }
    });
  }

  private normalizeText(word: string) {
    return word.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  onSearchTextEntered(expense: ExpensePerMonth, searchValue: string) {
    this.searchText = searchValue;
    const searchTextNormalized = this.normalizeText(this.searchText);
    const expenseMonthName = expense.name;

    const parameters = {
      expenseMonthName: expenseMonthName,
      wordOfSearch: searchTextNormalized
    }

    this.expenseService.getBySearch(parameters).subscribe({
      next: (response) => {
        expense.expenseDetailVO = [];
        expense.expenseDetailVO = response;
      }
    })
  }

  onChecked(expense: ExpensePerMonth, value: string, checked: boolean) {
    const expenseMonthName = expense.name;

    if (checked) {
      if (!this.paymentMethodChecked.includes(value)) {
        this.paymentMethodChecked.push(value);
      }
    } else {
      this.paymentMethodChecked = this.paymentMethodChecked.filter(
        (paymentName) => paymentName !== value
      );
    }

    const parameters = {
      expenseMonthName: expenseMonthName,
      paymentMethodChecked: this.paymentMethodChecked,
    };

    this.expenseService.listByPaymentMethod(parameters).subscribe({
      next: (response) => {
        expense.expenseDetailVO = [];
        expense.expenseDetailVO = response;
      },
    });
  }

  sumEntrancesExpensePerMonth(expense: ExpensePerMonth) {
    let totalEntrances = 0;
    expense.expenseDetailVO.forEach((value) => {
      totalEntrances += value.entrances;
    })

    return totalEntrances.toFixed(2);
  }

  sumBillsExpensePerMonth(expense: ExpensePerMonth) {
    let totalBills = 0;
    expense.expenseDetailVO.forEach((value) => {
      totalBills += value.bills;
    })

    return totalBills.toFixed(2);
  }

  deleteExpenseDialog(expense: Expense): void {
    this._matDialog.open(FinanceDeleteDialogComponent, {
      data: {
        id: expense.id
      }
    });
  }

  addSheetDialog(): void {
    this._matDialog.open(FinanceAddSheetComponent, {
    });
  }

  onSearchYear(searchValue: string) {
    this.searchText = searchValue;
    const searchTextNormalized = this.normalizeText(this.searchText);

    this.expenseService.getBySearchYear(searchTextNormalized).subscribe({
      next: (response) => {
        this.expenses = [];
        this.expenses = response;
        this.expenses.forEach(element => {
          element.expenseDetailVO.forEach(value => {
            this.totalEntrancesPerMonth += value.entrances;
            this.totalBillsPerMonth += value.bills;
          })
        })
      }
    });
  }


}
