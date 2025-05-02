import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaluationPerformanceUpdateComponent } from './avaluation-performance-update.component';

describe('AvaluationPerformanceUpdateComponent', () => {
  let component: AvaluationPerformanceUpdateComponent;
  let fixture: ComponentFixture<AvaluationPerformanceUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaluationPerformanceUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaluationPerformanceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
