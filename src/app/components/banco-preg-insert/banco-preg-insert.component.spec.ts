import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoPregInsertComponent } from './banco-preg-insert.component';

describe('BancoPregInsertComponent', () => {
  let component: BancoPregInsertComponent;
  let fixture: ComponentFixture<BancoPregInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BancoPregInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BancoPregInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
