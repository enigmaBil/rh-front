import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeuilleTempPageComponent } from './feuille-temp-page.component';

describe('FeuilleTempPageComponent', () => {
  let component: FeuilleTempPageComponent;
  let fixture: ComponentFixture<FeuilleTempPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeuilleTempPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeuilleTempPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
