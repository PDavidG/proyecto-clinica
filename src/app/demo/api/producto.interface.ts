
export interface Producto {
    codigoP:        string;
    nombreC:        string;
    sustanciaA:     string;
    linea_id:       string;
    marca_id:       number;
    precio1:        number;
    precio2:        number;
    precio3:        number;
    precio4:        number;
    existencia:     number;
    costo_u:        number;
    unidad:         string;
    impuesto_id:    string;
    minimo:         number;
    maximo:         number;
    imagen:         string;
    //usuario:        string;
   // fecha:          Date;
    bloqueado:      string;
    granel:         string;
    utilidad1:      number;
    utilidad2:      number;
    utilidad3:      number;
    utilidad4:      number;
}


export interface linea{
    linea: string
    descripcion: string;
}


export interface Prueba {
    no: number;
    cve_art: string;
    linea: string;
    descripcionAnterior: string;
    descripcionNueva: string;
    ancho40: number;
    existencia: number;
    gramaje: string;
    presentacion: string;
    sustActiva: string;
    um: string;
    estado: string;
}
