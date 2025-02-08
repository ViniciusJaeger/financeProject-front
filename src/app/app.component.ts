import { Component } from '@angular/core';
import { FinanceExpenesesDashboardComponent } from "./finance-expeneses-dashboard/finance-expeneses-dashboard.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, FinanceExpenesesDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'financeProject';
}
