import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaluationPerformanceAddComponent } from './avaluation-performance-add.component';

describe('AvaluationPerformanceAddComponent', () => {
  let component: AvaluationPerformanceAddComponent;
  let fixture: ComponentFixture<AvaluationPerformanceAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaluationPerformanceAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaluationPerformanceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
