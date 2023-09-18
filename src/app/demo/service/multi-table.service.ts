import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Impuesto, Linea, Marca } from '../api/interfaces';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto, Prueba } from '../api/producto.interface';


@Injectable({providedIn: 'root'})


export class MultiTableService {

    private baseUrl: string = environment.baseUrl;



    constructor(private http: HttpClient) { }

    addLinea(linea: Linea): Observable<Linea> {

        return this.http.post<Linea>(`${this.baseUrl}/postli.php`, linea);
    }
    
    getLineaId(): Observable<Linea[]> {

        //return this.http.get<Linea>(`${this.baseUrl}/getByIdL.php?linea=${id}`)
        return this.http.get<Linea[]>(`${this.baseUrl}/obtenerT.php`)

    }

    getProductoId(codigoP: string): Observable<Producto | undefined> {

      //  console.log({codigoP})

        return this.http.get<Producto>(`${this.baseUrl}/getByCodigoP.php?producto=${codigoP}`)
        .pipe(
            catchError(error => of(undefined))
        );
       
    }

    actualizarProductos(producto: Producto): Observable<Producto> {

        return this.http.patch<Producto>(`${this.baseUrl}/updateProducto.php`, producto);
    }

    eliminarProductoById (codigoP: string): Observable<boolean> {

        return this.http.delete(`${this.baseUrl}/deleteProducto.php?codigoP=${codigoP}`)
        .pipe(
            map(res => true),
            catchError( error => of(false)),
        );
    }



    addMarca(marca: Marca): Observable<Marca> {

        return this.http.post<Marca>(`${this.baseUrl}/postMarca.php`, marca);
    }

    getMarcaAll(): Observable<Marca[]> {

        //return this.http.get<Linea>(`${this.baseUrl}/getByIdL.php?linea=${id}`)
        return this.http.get<Marca[]>(`${this.baseUrl}/obtenerM.php`)

    }

    addImpuesto(impuesto: Impuesto): Observable<Impuesto> {

        return this.http.post<Impuesto>(`${this.baseUrl}/postImpuesto.php`, impuesto);
    }

    

    getImpuestoAll(): Observable<Impuesto[]> {

        //return this.http.get<Linea>(`${this.baseUrl}/getByIdL.php?linea=${id}`)
        return this.http.get<Impuesto[]>(`${this.baseUrl}/obtenerI.php`)

    }

    getLineaAll(): Observable<Linea[]> {

        //return this.http.get<Linea>(`${this.baseUrl}/getByIdL.php?linea=${id}`)
        return this.http.get<Linea[]>(`${this.baseUrl}/obtenerL.php`)

    }

    getProductosAll(): Observable<Producto[]> {

        //return this.http.get<Linea>(`${this.baseUrl}/getByIdL.php?linea=${id}`)
        return this.http.get<Producto[]>(`${this.baseUrl}/obtenerProductos.php`)

    }

    addProducto(producto: Producto): Observable<Producto> {

        return this.http.post<Producto>(`${this.baseUrl}/postProducto.php`, producto);
    }

    agregarPruebas(prueba: Prueba): Observable<Prueba> {

        return this.http.post<Prueba>(`${this.baseUrl}/postPrueba.php`, prueba);
    }

    actualizarImpuesto(impuesto: Impuesto): Observable<Impuesto>{
        if (!impuesto.impuesto) throw Error ('El nombre de impuesto es requerido');

        return this.http.patch<Impuesto>(`${this.baseUrl}/actualizarIm.php`, impuesto);
    }

    actualizarLinea(linea: Linea): Observable<Linea>{
        if (!linea.linea) throw Error ('El nombre de linea es requerido');

        return this.http.patch<Linea>(`${this.baseUrl}/actualizarLi.php`, linea);
    }

    deleteImpuesto(impuesto: string){

        return this.http.delete(`${this.baseUrl}/deleteIm.php?impuesto=${impuesto}`);
    }

    deleteLinea(linea: string){

        return this.http.delete(`${this.baseUrl}/deleteLin.php?linea=${linea}`);
    }
}