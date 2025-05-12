import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationPerformancePageComponent } from './avaluation-performance-page.component';

describe('AvaluationPerformancePageComponent', () => {
  let component: EvaluationPerformancePageComponent;
  let fixture: ComponentFixture<EvaluationPerformancePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluationPerformancePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationPerformancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
