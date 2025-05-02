import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeSearchComponent } from './conge-search.component';

describe('CongeSearchComponent', () => {
  let component: CongeSearchComponent;
  let fixture: ComponentFixture<CongeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CongeSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
