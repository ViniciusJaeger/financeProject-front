import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseColapseMenuComponent } from './expense-colapse-menu.component';

describe('ExpenseColapseMenuComponent', () => {
  let component: ExpenseColapseMenuComponent;
  let fixture: ComponentFixture<ExpenseColapseMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseColapseMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseColapseMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
