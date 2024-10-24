import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarFacturaComponent } from './mostrar-factura.component';

describe('MostrarFacturaComponent', () => {
  let component: MostrarFacturaComponent;
  let fixture: ComponentFixture<MostrarFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarFacturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
