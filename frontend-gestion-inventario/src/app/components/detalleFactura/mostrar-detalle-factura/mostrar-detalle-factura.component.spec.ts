import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarDetalleFacturaComponent } from './mostrar-detalle-factura.component';

describe('MostrarDetalleFacturaComponent', () => {
  let component: MostrarDetalleFacturaComponent;
  let fixture: ComponentFixture<MostrarDetalleFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarDetalleFacturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarDetalleFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
