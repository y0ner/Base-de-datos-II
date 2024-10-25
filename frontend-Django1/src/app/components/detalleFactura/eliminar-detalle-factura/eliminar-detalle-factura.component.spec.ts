import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarDetalleFacturaComponent } from './eliminar-detalle-factura.component';

describe('EliminarDetalleFacturaComponent', () => {
  let component: EliminarDetalleFacturaComponent;
  let fixture: ComponentFixture<EliminarDetalleFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarDetalleFacturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarDetalleFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
