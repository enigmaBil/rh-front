import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationPerformanceAddComponent } from './evaluation-performance-add.component';

describe('EvaluationPerformanceAddComponent', () => {
  let component: EvaluationPerformanceAddComponent;
  let fixture: ComponentFixture<EvaluationPerformanceAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluationPerformanceAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationPerformanceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
