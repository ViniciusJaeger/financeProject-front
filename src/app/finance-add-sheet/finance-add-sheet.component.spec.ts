import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceAddSheetComponent } from './finance-add-sheet.component';

describe('FinanceAddSheetComponent', () => {
  let component: FinanceAddSheetComponent;
  let fixture: ComponentFixture<FinanceAddSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceAddSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceAddSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
