import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeuilleTempSearchComponent } from './feuille-temp-search.component';

describe('FeuilleTempSearchComponent', () => {
  let component: FeuilleTempSearchComponent;
  let fixture: ComponentFixture<FeuilleTempSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeuilleTempSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeuilleTempSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
