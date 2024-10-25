import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarCategriaComponent } from './actualizar-categria.component';

describe('ActualizarCategriaComponent', () => {
  let component: ActualizarCategriaComponent;
  let fixture: ComponentFixture<ActualizarCategriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarCategriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarCategriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
