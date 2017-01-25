import {Component, Input}from '@angular/core';
import {NgForm} from '@angular/forms';
import {IModule, PikaModule} from '../pikaModule/PikaModule';
import {PikaModuleService} from '../pikaModule/pikaModule.service';

@Component ({
    selector: 'pm-product',
    templateUrl: 'product.component.html'
})
export class ProductComponent {
    product = new PikaModule('','','','','','','','','','',false, new Date());
   // products: IModule[]; 

    constructor(private _pikaModuleSerice: PikaModuleService) {  
        this.product.Sn 
    }

    submitForm(form: NgForm){
        
        let modules: IModule[] = [this.product];
        //this.products[0] = this.product;
        console.log(modules);
        this._pikaModuleSerice.save(modules)
            .subscribe(
                data => console.log('success: ', data),
                err => console.log('error: ',err)
            )
    }
}