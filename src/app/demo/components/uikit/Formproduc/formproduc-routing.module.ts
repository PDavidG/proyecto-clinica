import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormProducComponent } from './formproduc.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: FormProducComponent },
		{ path: 'impuesto', loadChildren: () => import('./impuesto/impuesto.module').then(m => m.ImpuestoModule) },
		{ path: 'linea', loadChildren: () => import('./linea/linea.module').then(m => m.LineaModule) },
		{ path: 'marca', loadChildren: () => import('./marca/marca.module').then(m => m.MarcaModule) },
	])],
	exports: [RouterModule]
})
export class FormProducRoutingModule { }