import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaluationPerformanceListComponent } from './avaluation-performance-list.component';

describe('AvaluationPerformanceListComponent', () => {
  let component: AvaluationPerformanceListComponent;
  let fixture: ComponentFixture<AvaluationPerformanceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaluationPerformanceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaluationPerformanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
