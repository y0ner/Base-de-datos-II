import { Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MostrarClienteComponent } from './components/cliente/mostrar-cliente/mostrar-cliente.component';
import { CrearClienteComponent } from './components/cliente/crear-cliente/crear-cliente.component';
import { ActualizarClienteComponent } from './components/cliente/actualizar-cliente/actualizar-cliente.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/clientes',  // Redirige a la ruta de clientes en lugar de a '/'
        pathMatch: 'full'
    },
    {
        path: 'clientes',
        component: MostrarClienteComponent,
    },
    {
        path: 'clientes/nuevo',
        component: CrearClienteComponent
    },
    {
        path: 'clientes/edit/:id',
        component: ActualizarClienteComponent
    },
    {
        path: '**',
        redirectTo: '/clientes',  // Redirige a clientes si la ruta no coincide con ninguna
        pathMatch: 'full'
    }
];
