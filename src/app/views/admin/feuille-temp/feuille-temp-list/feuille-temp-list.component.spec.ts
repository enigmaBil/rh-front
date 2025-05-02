import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeuilleTempListComponent } from './feuille-temp-list.component';

describe('FeuilleTempListComponent', () => {
  let component: FeuilleTempListComponent;
  let fixture: ComponentFixture<FeuilleTempListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeuilleTempListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeuilleTempListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
