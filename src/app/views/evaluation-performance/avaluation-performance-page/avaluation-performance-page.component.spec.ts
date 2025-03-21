import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaluationPerformancePageComponent } from './avaluation-performance-page.component';

describe('AvaluationPerformancePageComponent', () => {
  let component: AvaluationPerformancePageComponent;
  let fixture: ComponentFixture<AvaluationPerformancePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaluationPerformancePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaluationPerformancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
