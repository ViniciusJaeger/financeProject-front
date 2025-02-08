import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ExpenseService } from '../service/expense.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-finance-add-sheet',
  imports: [
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './finance-add-sheet.component.html',
  styleUrl: './finance-add-sheet.component.scss'
})
export class FinanceAddSheetComponent {
  fileToUpload: File | null = null;

  constructor(private _expenseService: ExpenseService, private _snackBar: MatSnackBar, private _dialog: MatDialog){}

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      this.fileToUpload = input.files[0];
    }
  }

  uploadFile(): void {
    if (!this.fileToUpload) {
      console.error('Nenhum arquivo selecionado!');
      return;
    }

    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);

    this._expenseService.saveInformationSheet(formData).subscribe(result => this.OnSucessSave())
  }

  OnSucessSave(){
    this._snackBar.open('Planilha enviada com sucesso!', '', { duration: 5000 });
    this._dialog.closeAll();
  }
}
