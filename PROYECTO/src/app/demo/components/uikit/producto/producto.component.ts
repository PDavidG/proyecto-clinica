import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Impuesto, Marca } from 'src/app/demo/api/interfaces';
import { Producto, linea } from 'src/app/demo/api/producto.interface';
import { MultiTableService } from 'src/app/demo/service/multi-table.service';

@Component({
    selector: 'producto-component',
    templateUrl: 'producto.component.html'
})

export class ProductoComponent implements OnInit {

    public urlImg= "http://localhost:8080/baseDatos/upload.php";

    public im: string;

    public urlImg2= 'http://localhost:8080/baseDatos/images';


    public producto?: Producto;

    public lin: linea[] = [];

    public line: string;

    public mar: Marca[] = [];

    public marc: string;

    public impu: Impuesto[] = [];

    public impus: string;

    public imagen: string;
    
    imag: string;

    uploadedFiles: any[] = [];

    constructor(private multiService: MultiTableService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder) { }

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
            costo_u: ['', [Validators.required]],
            unidad: ['', [Validators.required]],
            impuesto_id: ['', [Validators.required]],
            minimo: ['', [Validators.required]],
            maximo: ['', [Validators.required]],
            imagen: ['', [Validators.required]],
           // bloqueado: ['', [Validators.required]],
            utilidad1: ['', [Validators.required]],
            utilidad2: ['', [Validators.required]],
            utilidad3: ['', [Validators.required]],
            utilidad4: ['', [Validators.required]],
           })

    ngOnInit(): void {
        
        //if(!this.router.url.includes('edit')) return;

        this.activatedRoute.params
        .pipe(
            switchMap( ({producto}) => this.multiService.getProductoId(producto)),
            )
            .subscribe(productos => {
                
            //   if (!productos ) return this.router.navigate(['/uikit/formproduc']);
                
                this.myForm.reset(productos)
                
                this.im = (`${this.urlImg2}/${productos.imagen}`)
                return;
               // `${this.baseUrl}/obtenerM.php`
                

                
            });

            this.onGetlinea();
            this.onGetMarcas();
            this.onGetImpuesto();

            
            
        
     }

     get currentProducto(): Producto{

        const producto = this.myForm.value as Producto
        return producto;
     }


     onSubmit(): void {

        if(this.myForm.invalid) return;

        if (this.currentProducto.codigoP) {

            this.multiService.actualizarProductos(this.currentProducto)
            .subscribe( res => {
                console.log(res)
            });
            return;

            
        }
     }

     eliminarProducto() {

        if (!this.currentProducto.codigoP) throw Error('El codigo de producto es necesario');

        
     }


     isValidField(field: string): boolean | null {

        return this.myForm.controls[field].errors
        && this.myForm.controls[field].touched

    }


    //------------------------------

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
    
    onUpload(event: any) {
        for (const file of event.files) {
             this.uploadedFiles.push(file);

             this.imag = file.name.toString()
            const asd = this.myForm.value
             console.log(this.imag)
            

        }

       // this.messageService.add({ severity: 'info', summary: 'Felicidades', detail: 'Archivo subido' });
    }
}