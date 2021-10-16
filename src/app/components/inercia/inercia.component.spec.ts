import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InerciaComponent } from './inercia.component';

describe('InerciaComponent', () => {
  let component: InerciaComponent;
  let fixture: ComponentFixture<InerciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InerciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InerciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
