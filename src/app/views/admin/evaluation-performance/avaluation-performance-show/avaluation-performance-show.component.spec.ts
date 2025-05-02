import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaluationPerformanceShowComponent } from './avaluation-performance-show.component';

describe('AvaluationPerformanceShowComponent', () => {
  let component: AvaluationPerformanceShowComponent;
  let fixture: ComponentFixture<AvaluationPerformanceShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaluationPerformanceShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaluationPerformanceShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
