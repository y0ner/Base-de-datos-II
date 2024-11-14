import { Routes } from '@angular/router';

// Importaciones de las rutas de cliente
import { MostrarClienteComponent } from './components/cliente/mostrar-cliente/mostrar-cliente.component';
import { CrearClienteComponent } from './components/cliente/crear-cliente/crear-cliente.component';
import { ActualizarClienteComponent } from './components/cliente/actualizar-cliente/actualizar-cliente.component';


// Importaciones de las rutas de producto
import { MostrarProductoComponent } from './components/producto/mostrar-producto/mostrar-producto.component';
import { CrearProductoComponent } from './components/producto/crear-producto/crear-producto.component';
import { ActualizarProductoComponent } from './components/producto/actualizar-producto/actualizar-producto.component';

// Importaciones de las rutas de factura
import { MostrarFacturaComponent } from './components/factura/mostrar-factura/mostrar-factura.component';
import { CrearFacturaComponent } from './components/factura/crear-factura/crear-factura.component';
import { ActualizarFacturaComponent } from './components/factura/actualizar-factura/actualizar-factura.component';

import { Consulta1Component } from './components/queryadv/consulta1/consulta1.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    },

    // CRUD CLIENTES
    {
        path: "clientes",
        component: MostrarClienteComponent
    },
    {
        path: "clientes/nuevo",
        component: CrearClienteComponent
    },
    {
        path: "clientes/edit/:id",
        component: ActualizarClienteComponent
    },

   
    // CRUD Productos
    {
        path: "productos",
        component: MostrarProductoComponent
    },
    {
        path: "productos/nuevo",
        component: CrearProductoComponent
    },
    {
        path: "productos/edit/:id",
        component: ActualizarProductoComponent
    },

    // CRUD Facturas
    {
        path: "facturas",
        component: MostrarFacturaComponent
    },
    {
        path: "facturas/nuevo",
        component: CrearFacturaComponent
    },
    {
        path: "facturas/edit/:id",
        component: ActualizarFacturaComponent
    },
    {
        path: "queryadv/consulta1", 
        component: Consulta1Component 
    },

];
