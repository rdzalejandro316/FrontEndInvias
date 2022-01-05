import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesInternoComponent } from './solicitudes-interno.component';

describe('SolicitudesInternoComponent', () => {
  let component: SolicitudesInternoComponent;
  let fixture: ComponentFixture<SolicitudesInternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesInternoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
