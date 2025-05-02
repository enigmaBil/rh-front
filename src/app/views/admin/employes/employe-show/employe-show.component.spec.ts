import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeShowComponent } from './employe-show.component';

describe('EmployeShowComponent', () => {
  let component: EmployeShowComponent;
  let fixture: ComponentFixture<EmployeShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
