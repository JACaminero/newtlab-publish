import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaCorregirComponent } from './prueba-corregir.component';

describe('PruebaCorregirComponent', () => {
  let component: PruebaCorregirComponent;
  let fixture: ComponentFixture<PruebaCorregirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PruebaCorregirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaCorregirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
