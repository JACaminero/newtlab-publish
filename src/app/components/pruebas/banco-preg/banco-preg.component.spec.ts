import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoPregComponent } from './banco-preg.component';

describe('BancoPregComponent', () => {
  let component: BancoPregComponent;
  let fixture: ComponentFixture<BancoPregComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BancoPregComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BancoPregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
