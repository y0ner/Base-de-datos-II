import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarproyectoComponent } from './actualizarproyecto.component';

describe('ActualizarproyectoComponent', () => {
  let component: ActualizarproyectoComponent;
  let fixture: ComponentFixture<ActualizarproyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarproyectoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarproyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
