import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LineaComponent } from './linea.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: LineaComponent }
	])],
	exports: [RouterModule]
})
export class LineaRoutingModule { }