import { Routes } from '@angular/router';

//importaciones de las rutas client
import { MostrarClienteComponent } from './components/cliente/mostrar-cliente/mostrar-cliente.component';
import { CrearClienteComponent } from './components/cliente/crear-cliente/crear-cliente.component';
import { ActualizarClienteComponent } from './components/cliente/actualizar-cliente/actualizar-cliente.component';


import { MostrarCategoriaComponent } from './components/categoria/mostrar-categoria/mostrar-categoria.component';
import { CrearCategoriaComponent } from './components/categoria/crear-categoria/crear-categoria.component';
import { ActualizarCategriaComponent } from './components/categoria/actualizar-categria/actualizar-categria.component';
import { EliminarCategoriaComponent } from './components/categoria/eliminar-categoria/eliminar-categoria.component';

import { MostrarProductoComponent } from './components/producto/mostrar-producto/mostrar-producto.component';
import { CrearProductoComponent } from './components/producto/crear-producto/crear-producto.component';
import { ActualizarProductoComponent } from './components/producto/actualizar-producto/actualizar-producto.component';
import { EliminarProductoComponent } from './components/producto/eliminar-producto/eliminar-producto.component';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/', 
        pathMatch: 'full' 
    },

    //CRUD CLIENTES
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

  //CRUD CATEGORIA
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

    //CRUD Productos
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
];
