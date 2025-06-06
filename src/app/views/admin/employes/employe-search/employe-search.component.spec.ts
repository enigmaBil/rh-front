import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeSearchComponent } from './employe-search.component';

describe('EmployeSearchComponent', () => {
  let component: EmployeSearchComponent;
  let fixture: ComponentFixture<EmployeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
