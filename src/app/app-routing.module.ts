import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactoFormComponent } from './contacto-form/contacto-form.component';
import { InicioComponent } from './inicio/inicio.component';
import { VentaComponent } from './venta/venta.component';
import { GuitarrasComponent} from './guitarras/guitarras.component';
import { GaleriaComponent }  from './galeria/galeria.component';
import { CategoriaProductoComponent } from './categoria-producto/categoria-producto.component';

const routes: Routes = [
	{ path:'', redirectTo:'/index', pathMatch: 'full'},
	{ path: 'index', component: InicioComponent},
	{ path: 'contacto', component: ContactoFormComponent},
	{ path: 'venta', component: VentaComponent},
	{ path: 'guitarras', component: GuitarrasComponent},
	{ path: 'galeria', component: CategoriaProductoComponent},
	{ path: 'galeria/:id', component: GaleriaComponent}


	
];

@NgModule({
  imports: [
  	RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
