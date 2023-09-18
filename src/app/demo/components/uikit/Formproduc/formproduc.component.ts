import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { Impuesto, Linea, Marca } from 'src/app/demo/api/interfaces';
import { Producto, linea } from 'src/app/demo/api/producto.interface';
import { MultiTableService } from 'src/app/demo/service/multi-table.service';

import * as xls from 'xlsx';

@Component({
    selector: 'formlayou-name',
    templateUrl: 'formproduct.component.html',
    providers: [MessageService]
})

export class FormProducComponent implements OnInit {

    users:any

   // @ViewChild('costoInput')
    public costo!: ElementRef<HTMLInputElement>

    constructor(private multiService: MultiTableService,
        private fb: FormBuilder,
        private router: Router,
        private messageService: MessageService ) { }

        public myForm: FormGroup = this.fb.group ({
            codigoP: ['', [Validators.required]],
            nombreC: ['', [Validators.required]],
            sustanciaA: ['', [Validators.required]],
            linea_id: ['', [Validators.required]],
            marca_id: ['', [Validators.required]],
            precio1: ['', [Validators.required]],
            precio2: ['', [Validators.required]],
            precio3: ['', [Validators.required]],
            precio4: ['', [Validators.required]],
            existencia: ['', [Validators.required]],
            costo_u: [0, [Validators.required]],
            unidad: ['', [Validators.required]],
            impuesto_id: ['', [Validators.required]],
            minimo: ['', [Validators.required]],
            maximo: ['', [Validators.required]],
            imagen: ['', [Validators.required]],
            bloqueado: ['', [Validators.required]],
            granel: ['', [Validators.required]],
            utilidad1: ['', [Validators.required]],
            utilidad2: ['', [Validators.required]],
            utilidad3: ['', [Validators.required]],
            utilidad4: ['', [Validators.required]],
           });

        

           


    

    public lin: linea[] = [];

    public line: string

    public mar: Marca[] = [];

    public marc: string;

    public impu: Impuesto[] = [];

    public impus: string;

    public imagen: string;
    selectedState: any = null;

    

    dropdownItems = [
        { name: 'Nombre Comercial', code: 'Option 1' },
        { name: 'Sustancia Activa', code: 'Option 2' }
    ];

    cities1: any[] = [];

    cities2: any[] = [];

    city1: any = null;

    city2: any = null;

    uploadedFiles: any[] = [];

    public imag: string;

    public valor: string;

    public valorG: string;

    public utilidad: number;

    public utilidad2: number;

    public utilidad3: number;

    public utilidad4: number;

    public precio: number;

    public precio2: number;

    public precio3: number;

    public precio4: number;
   

    ngOnInit(): void {
        
        this.onGetlinea();
        this.onGetMarcas();
        this.onGetImpuesto();
        
        
    }


    onUpload(event: any) {
        for (const file of event.files) {
             this.uploadedFiles.push(file);

             const a = this.imag = file.name.toString()
            const asd = this.myForm.value
             console.log(asd)

             if(this.myForm.value.impuesto_id === 'IVA'){
                    const a = this.impu[0].valor + 10;
                    console.log(a);
             }
             if(this.myForm.value.impuesto_id === 'ISR'){
             const b = this.impu[1].valor + 3
             console.log(b)
            }

        }

        this.messageService.add({ severity: 'info', summary: 'Felicidades', detail: 'Archivo subido' });
    }

    onGetlinea(){
       
        this.multiService.getLineaId()
        .subscribe((lineas: linea[]) => this.lin = lineas)
        
    }

    onGetMarcas(){
       
        this.multiService.getMarcaAll()
        .subscribe((marcas: Marca[]) => this.mar = marcas )
        
        
    
        
        //.subscribe(marcas => this.mar = marcas)
        
    }

    onGetImpuesto(){
       
        this.multiService.getImpuestoAll()
     /*   .pipe(
            tap((impuesto: Impuesto[]) => impuesto.filter( res =>  console.log(res.impuesto) )),
           
        )*/
        .subscribe((impuesto: Impuesto[]) => this.impu = impuesto ) 
        
        
    }

    readExcelFile (e: any) {

        const file = e.target.files[0];
        
        const fr =  new FileReader();

        fr.readAsArrayBuffer(file);

        fr.onload = () => {

        const data = fr.result;

        const workbook = xls.read(data, {type: 'array'});

        const sheetname = workbook.SheetNames[0];
        
        const sheet1 = workbook.Sheets[sheetname]
        
        //xls.utils.sheet_to_json(sheet1, {raw:true} );

        this.users = xls.utils.sheet_to_json(sheet1, {raw:true});
        console.log(this.users)
        }
    }
    
    operandoA: number;
    operandoB: number;
    resultado: number;
  
    sumar(): void {
      this.resultado = this.operandoA + this.operandoB;
      console.log(this.resultado)
    }

    calcular(valorr: number):void{

        const numberValue = Number(valorr);

        if(this.myForm.value.precio1 === numberValue){
        const costo = this.myForm.value.costo_u;
        const utilidad = ((numberValue-costo) / costo) * 100;

        //const suma = numberValue + 10
        this.utilidad = utilidad;
        //console.log(this.utilidad)
        }  
        if(this.myForm.value.precio2 === numberValue){
            const costo = this.myForm.value.costo_u;
            const utilidad2 = ((numberValue-costo) / costo) * 100;

            this.utilidad2 = utilidad2;
            //console.log(this.utilidad2)
        }

        if(this.myForm.value.precio3 === numberValue){
            const costo = this.myForm.value.costo_u;
            const utilidad3 = ((numberValue-costo) / costo) * 100;

            this.utilidad3 = utilidad3;
            //console.log(this.utilidad3)
        }

        if(this.myForm.value.precio4 === numberValue){
            const costo = this.myForm.value.costo_u;
            const utilidad4 = ((numberValue-costo) / costo) * 100;

            this.utilidad4 = utilidad4;
           // console.log(utilidad4)
        }
    }

    calcularPrecio(util: number):void{

        const numberValue = Number(util);

        const costo = this.myForm.value.costo_u;

        if(this.myForm.value.utilidad1 === numberValue){
        //const precio = ((numberValue-costo) / costo) * 100;
        const precio = costo * ( 1 + ( numberValue / 100)) ;

        this.precio = precio;
        console.log(precio)
        }

        if(this.myForm.value.utilidad2 === numberValue){
           
            const precio = costo * ( 1 + ( numberValue / 100));
            this.precio2 = precio;
            console.log(this.precio2)
        }

        if(this.myForm.value.utilidad3 === numberValue){
            const numberValue = Number(util);
            const costo = this.myForm.value.costo_u;
            const precio = costo * ( 1 + ( numberValue / 100)); 
            this.precio3 = precio;
            console.log(this.precio3)
        }

        if(this.myForm.value.utilidad4 === numberValue){
            const costo = this.myForm.value.costo_u;
            const precio = costo * ( 1 + ( util / 100)) 
            this.precio4 = precio;
            console.log(this.precio4)
        }
    }


    isValidField(field: string): boolean | null {

        return this.myForm.controls[field].errors
        && this.myForm.controls[field].touched

    }

    get producto(): Producto {
        


        const mar = this.myForm.value as Producto;

     //   const mar1 = (this.myForm.value.nombreC) as Producto;
        
       
     //   const mara = this.myForm.value.codigoP as Producto;
     //   const mara1 = this.myForm.value.impuestoId as Producto

     //   const mar12 = JSON.stringify(mara1)
        //Object.assign(mar, mar2)
        return mar;
    }

    onSubmit():void {
        if( this.myForm.invalid) {
            this.myForm.markAllAsTouched();
            return;
        }
        const d = this.producto

       // const da = this.impu.toString()
      //  const a = Object.values(da)
       //const dr = JSON.stringify(da)

        //const sa = this.myForm.value.impuesto_Id

       //console.log(...Object.values(sa));
    //   Object.assign(d, e)
       console.log(d);

        this.multiService.addProducto(this.producto).subscribe( res => {
            
            this.router.navigate(['/uikit/formProducA']);
            console.log(res)
        })
    }

    // CHECKBOX

    

}