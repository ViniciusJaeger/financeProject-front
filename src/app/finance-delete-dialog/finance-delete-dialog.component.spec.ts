import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceDeleteDialogComponent } from './finance-delete-dialog.component';

describe('FinanceDeleteDialogComponent', () => {
  let component: FinanceDeleteDialogComponent;
  let fixture: ComponentFixture<FinanceDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceDeleteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
