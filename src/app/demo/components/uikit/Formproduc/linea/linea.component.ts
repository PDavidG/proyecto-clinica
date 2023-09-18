import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Linea } from 'src/app/demo/api/interfaces';
import { MultiTableService } from 'src/app/demo/service/multi-table.service';

@Component({
    selector: 'lineaP-component',
    templateUrl: 'linea.component.html'
})

export class LineaComponent implements OnInit {

    public lin: Linea[] = [];

    public linea1: Linea = {linea: '', descripcion: ''};

    public lineas: {};

    public displayUpdate: boolean;

    public displayAdd: boolean;

    public displayDelete: boolean;

    public valor: string;

   public myForm: FormGroup = this.fb.group ({
    linea: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
   })


    constructor(private multiTable: MultiTableService,
        private fb: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {

        this.onGetlinea();

     }


    get linea(): Linea {
        const lin = this.myForm.value as Linea;
        return lin;
    }

    isValidField(field: string): boolean | null {

        return this.myForm.controls[field].errors
        && this.myForm.controls[field].touched

    }


    onSubmit():void {
        if( this.myForm.invalid) {
            this.myForm.markAllAsTouched();
            return;
        }

        
        this.multiTable.addLinea(this.linea).subscribe( () => {

            this.router.navigateByUrl('/RefreshComponent', {skipLocationChange: true}).then(()=> {
                this.router.navigate(['/uikit/formproduc/linea']);
            });

        })

        this.displayAdd = false;
    }

    onGetlinea(): void {
       
        this.multiTable.getLineaAll()
        .subscribe((linea: Linea[]) => this.lin = linea)
    }
    
    editarLinea() {

        if(this.linea.linea) {

            this.multiTable.actualizarLinea(this.linea)
            .subscribe( res => {

                this.router.navigateByUrl('/RefreshComponent', {skipLocationChange: true}).then(()=> {
                    this.router.navigate(['/uikit/formproduc/linea']);
                });

            })
        }
        this.displayUpdate = false;
    }

    eliminarLinea() {

        if(this.linea.linea) {

            this.multiTable.deleteLinea(this.linea.linea)
            .subscribe( () => {

                this.router.navigateByUrl('/RefreshComponent', {skipLocationChange: true}).then(()=> {
                    this.router.navigate(['/uikit/formproduc/linea']);
            });

        })

        this.displayUpdate = false;
     }
    }

    showModalLinea(linea: Linea) {

        this.linea1 = {...linea}

        this.displayUpdate = true;
    }

    modalAgregarL() {

        this.displayAdd = true;
    }

    confirmDelete() {

        this.displayDelete = true;
    }
}