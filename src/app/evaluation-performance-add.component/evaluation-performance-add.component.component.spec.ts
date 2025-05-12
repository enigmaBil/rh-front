import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationPerformanceAddComponentComponent } from './evaluation-performance-add.component.component';

describe('EvaluationPerformanceAddComponentComponent', () => {
  let component: EvaluationPerformanceAddComponentComponent;
  let fixture: ComponentFixture<EvaluationPerformanceAddComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluationPerformanceAddComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationPerformanceAddComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
