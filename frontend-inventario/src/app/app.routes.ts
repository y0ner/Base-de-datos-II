import { Routes } from '@angular/router';

// Importaciones de las rutas de cliente
import { MostrarClienteComponent } from './components/cliente/mostrar-cliente/mostrar-cliente.component';
import { CrearClienteComponent } from './components/cliente/crear-cliente/crear-cliente.component';
import { ActualizarClienteComponent } from './components/cliente/actualizar-cliente/actualizar-cliente.component';

import { MostrarCategoriaComponent } from './components/categoria/mostrar-categoria/mostrar-categoria.component';
import { CrearCategoriaComponent } from './components/categoria/crear-categoria/crear-categoria.component';
import { ActualizarCategriaComponent } from './components/categoria/actualizar-categria/actualizar-categria.component';

import { MostrarProductoComponent } from './components/producto/mostrar-producto/mostrar-producto.component';
import { CrearProductoComponent } from './components/producto/crear-producto/crear-producto.component';
import { ActualizarProductoComponent } from './components/producto/actualizar-producto/actualizar-producto.component';

import { MostrarFacturaComponent } from './components/factura/mostrar-factura/mostrar-factura.component';
import { CrearFacturaComponent } from './components/factura/crear-factura/crear-factura.component';
import { ActualizarFacturaComponent } from './components/factura/actualizar-factura/actualizar-factura.component';

// Importaciones para Inventario
import { MostrarInventarioComponent } from '../app/components/inventarios/mostrar-inventario/mostrar-inventario.component'; // Asegúrate de que la ruta sea correcta
import { CrearInventarioComponent } from '../app/components/inventarios/crear-inventario/crear-inventario.component'; // Asegúrate de que la ruta sea correcta
import { ActualizarInventarioComponent } from '../app/components/inventarios/actualizar-inventario/actualizar-inventario.component'; // Asegúrate de que la ruta sea correcta

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

    // CRUD CATEGORIA
    {
        path: "categorias",
        component: MostrarCategoriaComponent
    },
    {
        path: "categorias/nuevo",
        component: CrearCategoriaComponent
    },
    {
        path: "categorias/edit/:id",
        component: ActualizarCategriaComponent
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

    // CRUD Inventarios
    {
        path: "inventarios",
        component: MostrarInventarioComponent
    },
    {
        path: "inventarios/nuevo",
        component: CrearInventarioComponent
    },
    {
        path: "inventarios/edit/:id",
        component: ActualizarInventarioComponent
    },
];
