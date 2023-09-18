import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { formProducAComponent } from './formproducA.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: formProducAComponent },
	])],
	exports: [RouterModule]
})
export class FormProducARoutingModule { }