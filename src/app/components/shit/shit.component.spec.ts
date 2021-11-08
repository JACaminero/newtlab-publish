import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShitComponent } from './shit.component';

describe('ShitComponent', () => {
  let component: ShitComponent;
  let fixture: ComponentFixture<ShitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
