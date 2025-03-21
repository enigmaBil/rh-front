import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaluationPerformanceSearchComponent } from './avaluation-performance-search.component';

describe('AvaluationPerformanceSearchComponent', () => {
  let component: AvaluationPerformanceSearchComponent;
  let fixture: ComponentFixture<AvaluationPerformanceSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaluationPerformanceSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaluationPerformanceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
