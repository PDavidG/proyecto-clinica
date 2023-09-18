import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { switchMap, tap } from 'rxjs';
import { MenuItemsa } from 'src/app/demo/api/interfaces';
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

    public itemS: string;


    constructor(private multiService: MultiTableService,
        ) { }

    ngOnInit() {
        
        //console.log(this.itemS)
       
        
        this.obtenerProductos()
    //    this.poor()
        //console.log(this.Productosa())
        
      //  const a = this.productos = this.obtenerProductos()
       
        this.item = [
            {
              // routerLink: "['/uikit/edit', productos.codigoP]",
              label: 'editar',
              icon: 'pi pi-pencil',
              command: () => {
                
                //console.log(this.Productosa())
     //           const a = this.obtenerProductos()[0].codigoP

             //   this.messageService.add({
              //    severity: 'info',
             //     summary: 'Add',
            //      detail: 'Data Added',
             //   });
              },
            },
        ];

        

     }
     

    obtenerProductos() {

        this.multiService.getProductosAll()
        .pipe(
            
      //    tap( res => ((Object.values(res)[0].codigoP)) = this.itemS  )
    
   
        )
        .subscribe((producto: Producto[]) => this.productos = producto)
        
    
    }
    
    Productosa() {

        this.multiService.getProductosAll()
        .pipe(
            
         tap( res => ((Object.values(res)[0].codigoP))  )
            
   
        )
        .subscribe((res: Producto[]) => res)
        
    
    }
    
    poor() {
        const aaad = this.productos
        for (const value of aaad) {
            console.log(value.codigoP);
            return;
          }
        
    }
}