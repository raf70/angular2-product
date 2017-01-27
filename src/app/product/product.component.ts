import {Component, Input}from '@angular/core';
import {NgForm} from '@angular/forms';
import {IModule, PikaModule} from '../models/PikaModule';
import {IModuleSchema} from '../models/productSchema';
import {PikaModuleService, ProductMetadataService} from '../services/db.service';

@Component ({
    selector: 'pm-product',
    templateUrl: 'product.component.html'
})
export class ProductComponent {
    title = 'My sample PIKA product';
    moduleNames: string[] = ['chassy','module2','module3','module4'];
    productNames: String[]; // list of products for add product select box
    productName: String;  // name of product to be added
    productSchema: IModuleSchema[]
    errorMessage: string;
    products: PikaModule[]; // = 
    //     [
    //         new PikaModule('chassis',true),
    //         new PikaModule('module1',false),
    //         new PikaModule('module2',false), 
    //         new PikaModule('module3',false)
    //         ];



    constructor(private _productMetadataSerice: ProductMetadataService, private _pikaModuleSerice: PikaModuleService) {

    }
    // populate select product drop down box
    

    ngOnInit(): void {


       this._productMetadataSerice.getProductNames()
       .subscribe(
          modules => this.productNames = modules,
          error => this.errorMessage = <any>error);
    }



    // onNotify(product: PikaModule): void {
    //   this.product = product;
    // }

    getProductStructure(productName: string) {
         if (productName.length > 0)
             this._productMetadataSerice.getProductStructure(productName)
                .subscribe(
                    data => {
                        this.productSchema = data 
                        console.log('success: ', data)
                        this.title = productName
                        // fod loop to create our PikaModules
                },
                    err => console.log('error: ', err)                   
                )
    }


    submitForm(form: NgForm){
        console.log(this.products);
        this._pikaModuleSerice.save(this.products)
            .subscribe(
                data => console.log('success: ', data),
                err => console.log('error: ',err)
            )
    }
}
