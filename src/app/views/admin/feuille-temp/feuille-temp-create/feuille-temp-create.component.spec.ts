import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeuilleTempCreateComponent } from './feuille-temp-create.component';

describe('FeuilleTempCreateComponent', () => {
  let component: FeuilleTempCreateComponent;
  let fixture: ComponentFixture<FeuilleTempCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeuilleTempCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeuilleTempCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
