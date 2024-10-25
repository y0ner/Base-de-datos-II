import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarFacturaComponent } from './actualizar-factura.component';

describe('ActualizarFacturaComponent', () => {
  let component: ActualizarFacturaComponent;
  let fixture: ComponentFixture<ActualizarFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarFacturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
