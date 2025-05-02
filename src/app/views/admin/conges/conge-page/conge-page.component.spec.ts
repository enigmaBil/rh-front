import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongePageComponent } from './conge-page.component';

describe('CongePageComponent', () => {
  let component: CongePageComponent;
  let fixture: ComponentFixture<CongePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CongePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
