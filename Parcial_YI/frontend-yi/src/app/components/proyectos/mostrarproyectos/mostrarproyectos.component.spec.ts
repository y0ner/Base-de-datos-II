import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarproyectosComponent } from './mostrarproyectos.component';

describe('MostrarproyectosComponent', () => {
  let component: MostrarproyectosComponent;
  let fixture: ComponentFixture<MostrarproyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarproyectosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarproyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
