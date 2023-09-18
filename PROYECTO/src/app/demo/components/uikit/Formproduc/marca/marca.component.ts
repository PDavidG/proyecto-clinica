import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Marca } from 'src/app/demo/api/interfaces';
import { MultiTableService } from 'src/app/demo/service/multi-table.service';

@Component({
    selector: 'marcaP-component',
    templateUrl: 'marca.component.html'
})

export class MarcaComponent implements OnInit {

    public myForm: FormGroup = this.fb.group ({
        marca: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
       })

    constructor(private multiTable: MultiTableService,
        private fb: FormBuilder,
        private router: Router, ) { }

    ngOnInit() { }


    get marca(): Marca {
        const mar = this.myForm.value as Marca;
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
        this.multiTable.addMarca(this.marca).subscribe( () => {
            this.router.navigate(['/uikit/formproduc']);
        })
    }
    
}