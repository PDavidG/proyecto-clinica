import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { switchMap, tap } from 'rxjs';
import { Linea, Marca, MenuItemsa } from 'src/app/demo/api/interfaces';
import { Producto } from 'src/app/demo/api/producto.interface';
import { MultiTableService } from 'src/app/demo/service/multi-table.service';

@Component({
    selector: 'formproducA-component',
    templateUrl: 'formproducA.component.html'
})

export class formProducAComponent implements OnInit {

    public productos: Producto[] =[];

    public items: MenuItem[] = [];

    public item: MenuItemsa[];

    //public lineaq

    public deleteImpuDial: boolean;

    public updateImpuDial: boolean;

    public itemS: Producto = {codigoP: '', nombreC: '', sustanciaA: '', linea_id: '', marca_id: 0, precio1: 0, precio2: 0, precio3: 0, precio4: 0, existencia: 0, costo_u:0, unidad: '', impuesto_id: '', minimo: 0, maximo: 0, imagen: '', granel: '', bloqueado: '',utilidad1: 0, utilidad2: 0, utilidad3: 0, utilidad4: 0};

    unidad:         string;
    impuesto_id:    string;
    minimo:         number;
    maximo:         number;
    imagen:         string;
    constructor(private multiService: MultiTableService,
        private router: Router,
        ) { }

        dajsd(imp: Producto){
            this.itemS = {...imp}

            this.multiService.eliminarProductoById(this.itemS.codigoP)
            .subscribe(
            res => {
                this.router.navigateByUrl('/RefreshComponent', {skipLocationChange: true}).then(()=> {
                    this.router.navigate(['/uikit/formProducA']);
                });
            }
        )
     }
        

    ngOnInit() {
        

        this.item = [
            {//  [routerLink]="['/uikit/edit', producto.codigoP]" 
                
                tooltipOptions: {
                    tooltipLabel: "Editar"
                },
                icon: 'pi pi-pencil',
                command: () => {
                this.confirmUpdate();
                    
           //         this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                }
            },
            {   
                tooltipOptions: {
                    tooltipLabel: "Eliminar"
                },
                icon: 'pi pi-trash',
                command: () => {
                    this.confirmDelete();
                    
           //         this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                }
            },
           
        ];
        
   //     console.log(this.itemS)
       
       this.obtenerProductos()
        
       //    this.poor()
        //console.log(this.Productosa())
        
      //  const a = this.productos = this.obtenerProductos()
       

        

     }
     

    obtenerProductos() {

        this.multiService.getProductosAll()
        .pipe(
            
     //     tap( res => this.itemS = res.toString() )
    
   
        )
        .subscribe((producto: Producto[]) => this.productos = producto)
    }

    confirmUpdate() {
      //  console.log('hols')
        this.updateImpuDial = true;
    }
    confirmDelete() {
      //  console.log('hols')
        this.deleteImpuDial = true;
    }
    
    
    
}