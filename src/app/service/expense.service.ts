import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { ExpensePerMonth } from "../model/ExpensesPerMonth";
import { Expense } from "../model/Expense";

@Injectable({
    providedIn: 'root'
  })
  export class ExpenseService {

    private readonly API = 'http://localhost:8080/finance'
  
    constructor(private httpClient: HttpClient) { }

    saveInformationSheet(file: FormData){
      return this.httpClient.post<any>(this.API + "/saveInformationExpenses", file)
    }
  
    list()  {
      return this.httpClient.get<ExpensePerMonth[]>(this.API).pipe(tap());
    }

    listByPaymentMethod(elements: { expenseMonthName: string, paymentMethodChecked: string[] })  {
      const params = new HttpParams().set('expenseMonthName', elements.expenseMonthName ).set('paymentMethodChecked', elements.paymentMethodChecked.join(','))
      return this.httpClient.get<Expense[]>(this.API + "/listByPaymentMethod", { params }).pipe(tap());
    }

    getBySearch(elements: { expenseMonthName: string, wordOfSearch: string })  {
      const params = new HttpParams().set('expenseMonthName', elements.expenseMonthName ).set('wordOfSearch', elements.wordOfSearch)
      return this.httpClient.get<Expense[]>(this.API + "/getBySearch", { params }).pipe(tap());
    }

    updateExpense(element: Expense) {
      return this.httpClient.put<Expense>(`${this.API + "/updateExpense"}/${element.id}`, element)
    }

    deleteExpense(element: string) {
      return this.httpClient.delete<Expense>(`${this.API + "/deleteExpense"}/${element}`)
    }

    getBySearchYear(wordOfSearch: string){
      const params = new HttpParams().set('wordOfSearch', wordOfSearch)
      return this.httpClient.get<ExpensePerMonth[]>(this.API + "/getBySearchYear", { params }).pipe(tap());
    }
  }