import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaTieComponent } from './tarjeta-tie.component';

describe('TarjetaTieComponent', () => {
  let component: TarjetaTieComponent;
  let fixture: ComponentFixture<TarjetaTieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetaTieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaTieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
