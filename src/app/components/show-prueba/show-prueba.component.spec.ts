import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPruebaComponent } from './show-prueba.component';

describe('ShowPruebaComponent', () => {
  let component: ShowPruebaComponent;
  let fixture: ComponentFixture<ShowPruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPruebaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
