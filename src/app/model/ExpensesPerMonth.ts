import { Expense } from "./Expense";

export interface ExpensePerMonth {
    name: string,
    expenseDetailVO: Expense[];
}