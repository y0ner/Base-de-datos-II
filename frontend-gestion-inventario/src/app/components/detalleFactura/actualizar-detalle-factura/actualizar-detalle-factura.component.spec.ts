import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarDetalleFacturaComponent } from './actualizar-detalle-factura.component';

describe('ActualizarDetalleFacturaComponent', () => {
  let component: ActualizarDetalleFacturaComponent;
  let fixture: ComponentFixture<ActualizarDetalleFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarDetalleFacturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarDetalleFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
