import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactoFormComponent } from './contacto-form/contacto-form.component';
import { InicioComponent } from './inicio/inicio.component';
import { VentaComponent } from './venta/venta.component';
import { GuitarrasComponent } from './guitarras/guitarras.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { CategoriaProductoComponent } from './categoria-producto/categoria-producto.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		ContactoFormComponent,
		InicioComponent,
		VentaComponent,
		GuitarrasComponent,
		GaleriaComponent,
		CategoriaProductoComponent,
		ErrorPageComponent
	],
	imports: [ BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule ],
	providers: [ Title ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
