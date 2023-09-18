import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImpuestoComponentP } from './impuesto.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ImpuestoComponentP }
		
	])],
	exports: [RouterModule]
})
export class ImpuestoRoutingModule { }