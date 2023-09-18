import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { Impuesto } from 'src/app/demo/api/interfaces';
import { MultiTableService } from 'src/app/demo/service/multi-table.service';

@Component({
    selector: 'impuesotoP-component',
    templateUrl: 'impuesto.component.html',
    providers: [MessageService]
})

export class ImpuestoComponentP implements OnInit {

    public impuestos: Impuesto[] = [];

    public impuestos1: Impuesto = {impuesto:'', descripcion: '', valor:0} ;

    public impuestos12: {};




    public displayModal: boolean;

    public displayModalA: boolean;

    public valor1: string;

    public deleteImpuDial: boolean;

    //public impues: Impuesto = [];

    public myForm: FormGroup = this.fb.group ({
        impuesto: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
        valor: ['', [Validators.required]],
       })

    constructor(private multiTable: MultiTableService,
        private fb: FormBuilder,
        private router: Router, 
        private messageService: MessageService,) { }

    ngOnInit() {
           
        this.onGetImpuesto();
        
     }


    get impuesto(): Impuesto {
        const mar = this.myForm.value as Impuesto;
        return mar;
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
        this.multiTable.addImpuesto(this.impuesto).subscribe( () => {
            
            this.router.navigateByUrl('/RefreshComponent', {skipLocationChange: true}).then(()=> {
                this.router.navigate(['/uikit/formproduc/impuesto']);
            });

        })

        this.displayModalA = false;
        
    }

    editarImpuesto() {

       // this.impuesto = {...impuesto}

        if(this.impuesto.impuesto){

            this.multiTable.actualizarImpuesto(this.impuesto)
            .subscribe(res =>{
                //this.router.navigateByUrl('/uikit/formproduc/impuesto');
                
                this.router.navigateByUrl('/RefreshComponent', {skipLocationChange: true}).then(()=> {
                    this.router.navigate(['/uikit/formproduc/impuesto']);
                });
                
                console.log(res)
            })  
            this.displayModal = false;
        }
        
    }

    eliminarImpuesto() {
        
        if(this.impuesto.impuesto) {
             this.multiTable.deleteImpuesto(this.impuesto.impuesto)
             .subscribe(res =>{

                this.router.navigateByUrl('/RefreshComponent', {skipLocationChange: true}).then(()=> {
                    this.router.navigate(['/uikit/formproduc/impuesto']);
                });

                console.log(res)
             })
             this.displayModal = false;
        }
    }


    showModalImpuesto(impuesto: Impuesto){
        
        this.impuestos1 = {...impuesto}
        
        // console.log(this.impuestos1)
        // const da = Object.values(a)[0]
        // this.impuestos12 = da
        // console.log(this.impuestos12)
        this.displayModal = true;

       
        
    }


    modalAgregarI(){
        
        this.displayModalA = true;
    }

    onGetImpuesto(){
       
        this.multiTable.getImpuestoAll()
     /*   .pipe(
            tap((impuesto: Impuesto[]) => impuesto.filter( res =>  console.log(res.impuesto) )),
           
        )*/
        .pipe(
            tap(res => {
                 
        //        console.log(res) // Con esta linea muestra en la consola todos los valores de la tabla impuestos
            })
        )
        .subscribe((impuesto: Impuesto[]) => this.impuestos = impuesto ) 
        
    }

    confirmDelete() {
        this.deleteImpuDial = true;
    }

    
}