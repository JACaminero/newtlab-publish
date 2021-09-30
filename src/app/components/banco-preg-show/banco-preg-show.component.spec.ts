import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoPregShowComponent } from './banco-preg-show.component';

describe('BancoPregShowComponent', () => {
  let component: BancoPregShowComponent;
  let fixture: ComponentFixture<BancoPregShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BancoPregShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BancoPregShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
