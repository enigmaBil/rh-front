import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  EvaluationPerformanceUpdateComponent } from './avaluation-performance-update.component';

describe('AvaluationPerformanceUpdateComponent', () => {
  let component: EvaluationPerformanceUpdateComponent;
  let fixture: ComponentFixture<EvaluationPerformanceUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluationPerformanceUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationPerformanceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
