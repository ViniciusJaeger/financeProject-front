import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceEditComponent } from './finance-edit.component';

describe('FinanceEditComponent', () => {
  let component: FinanceEditComponent;
  let fixture: ComponentFixture<FinanceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
