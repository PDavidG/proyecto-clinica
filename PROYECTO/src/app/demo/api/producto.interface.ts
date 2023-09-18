
export interface Producto {
    codigoP:        string;
    nombreC:        string;
    sustanciaA:     string;
    linea_id:       linea;
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
   // granel:         string;
   // bloqueado:      string;
    utilidad1:      string;
    utilidad2:      string;
    utilidad3:      string;
    utilidad4:      string;
}


export interface linea{
    linea: string
    descripcion: string;
}

