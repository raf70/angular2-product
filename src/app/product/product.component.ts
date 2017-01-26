import {Component, Input}from '@angular/core';
import {NgForm} from '@angular/forms';
import {IModule, PikaModule} from '../pikaModule/PikaModule';
import {PikaModuleService} from '../pikaModule/pikaModule.service';

@Component ({
    selector: 'pm-product',
    templateUrl: 'product.component.html'
})
export class ProductComponent {
    title = 'My sample PIKA product';
    moduleNames: string[] = ['chassy','module2','module3','module4'];
    products: PikaModule[] = 
        [
            new PikaModule('chassis',true),
            new PikaModule('module1',false),
            new PikaModule('module2',false), 
            new PikaModule('module3',false)
            ];

    constructor(private _pikaModuleSerice: PikaModuleService) {

    }
    // onNotify(product: PikaModule): void {
    //   this.product = product;
    // }

    submitForm(form: NgForm){
        console.log(this.products);
        this._pikaModuleSerice.save(this.products)
            .subscribe(
                data => console.log('success: ', data),
                err => console.log('error: ',err)
            )
    }
}
