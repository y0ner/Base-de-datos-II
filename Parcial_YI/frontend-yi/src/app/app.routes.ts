import { Routes } from '@angular/router';
import { MostrarproyectosComponent } from './components/proyectos/mostrarproyectos/mostrarproyectos.component';
import { EliminarproyectoComponent } from './components/proyectos/eliminarproyecto/eliminarproyecto.component';
import { ActualizarproyectoComponent } from './components/proyectos/actualizarproyecto/actualizarproyecto.component';
import { CrearproyectosComponent } from './components/proyectos/crearproyectos/crearproyectos.component';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/', 
        pathMatch: 'full' 
    },
    {
        path: "proyectos",
        component: MostrarproyectosComponent
    },
    {
        path: "proyectos/nuevo",
        component: CrearproyectosComponent
    },
    {
        path: "proyectos/edit/:id",
        component: ActualizarproyectoComponent
    },
    {
        path: "proyectos/edit/:id",
        component: EliminarproyectoComponent
    },
];
