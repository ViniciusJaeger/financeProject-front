import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceExpenesesDashboardComponent } from './finance-expeneses-dashboard.component';

describe('FinanceExpenesesDashboardComponent', () => {
  let component: FinanceExpenesesDashboardComponent;
  let fixture: ComponentFixture<FinanceExpenesesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceExpenesesDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceExpenesesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
