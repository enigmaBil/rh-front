import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeuilleTempUpdateComponent } from './feuille-temp-update.component';

describe('FeuilleTempUpdateComponent', () => {
  let component: FeuilleTempUpdateComponent;
  let fixture: ComponentFixture<FeuilleTempUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeuilleTempUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeuilleTempUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
