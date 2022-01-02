import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeajesComponent } from './peajes.component';

describe('PeajesComponent', () => {
  let component: PeajesComponent;
  let fixture: ComponentFixture<PeajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeajesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
