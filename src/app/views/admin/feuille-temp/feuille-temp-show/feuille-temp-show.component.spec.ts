import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeuilleTempShowComponent } from './feuille-temp-show.component';

describe('FeuilleTempShowComponent', () => {
  let component: FeuilleTempShowComponent;
  let fixture: ComponentFixture<FeuilleTempShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeuilleTempShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeuilleTempShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
