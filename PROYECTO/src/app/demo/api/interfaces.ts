

export interface Linea {
    linea:          string;
    descripcion:    string;
}



export interface Marca {
    marca:          string;
    descripcion:    string;
}


export interface Impuesto {
    impuesto:       string;
    descripcion:    string;
    valor:          number;
}

export interface MenuItemsa {
    label:string
    icon?: string
    routerLink?: any;
    command?: (event?: any) => void;
}



