import { PaymentMethod } from "../enums/PaymentMethod";

export interface Expense {
    id: string;
    date: Date;
    paymentMethod: PaymentMethod;
    activity: string;
    entrances: number;
    bills: number;
}