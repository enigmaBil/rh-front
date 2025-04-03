import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseEmployeComponent } from './base-employe.component';

describe('BaseEmployeComponent', () => {
  let component: BaseEmployeComponent;
  let fixture: ComponentFixture<BaseEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseEmployeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
