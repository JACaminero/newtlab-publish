import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InerciaRealComponent } from './inercia-real.component';

describe('InerciaRealComponent', () => {
  let component: InerciaRealComponent;
  let fixture: ComponentFixture<InerciaRealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InerciaRealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InerciaRealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
