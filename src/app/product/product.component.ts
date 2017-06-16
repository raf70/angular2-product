import {Component, Input}from '@angular/core';
import {NgForm} from '@angular/forms';
import {IModule, PikaModule} from '../models/PikaModule';
import {IModuleSchema, INameMap, ProductRowSchema} from '../models/productSchema';
import {PikaModuleService, ProductMetadataService} from '../services/db.service';

@Component ({
    selector: 'pm-product',
    templateUrl: 'product.component.html'
})
export class ProductComponent {
    title = 'My sample PIKA product';
    productNames: INameMap[]; // list of products for add product select box with list of modules
    productName: INameMap;  // name of product to be added
    moduleList: String;  // list of components comprising productName
    product: ProductRowSchema // description of individual component sent to subproduct ng-component
    productRows: ProductRowSchema[] 
    errorMessage: string;

    constructor(private _productMetadataSerice: ProductMetadataService, private _pikaModuleSerice: PikaModuleService) {
    }

    ngOnInit(): void {
       this._productMetadataSerice.getProductNames()
       .subscribe(
          modules => this.productNames = modules,
          error => this.errorMessage = <any>error);
    }

    getProductStructure(bonehead: INameMap) {
        if (bonehead.ModuleList.length > 0)
             this._productMetadataSerice.getProductStructure(bonehead.ModuleList)
                .subscribe(
                    data => { 
                        this.productRows = setupRows(data, bonehead.ModuleList)
                        this.title = bonehead.ProductName 
                        //console.log('success: ', this.productRows)
                    },
                    err => console.log('error: ', err)                   
                )
    }


    submitForm(form: NgForm){
        // connect all components to parent device
         var parentSn: string
            //can avoid this if we can guarentee that parent will be first/last item in the list
            for (let p of this.productRows) {
                if (p.ItemNo.trim() == this.productName.ProductName.trim()) {
                    parentSn = p.Sn;
                    break;
            }
            }
            
            for (let p of this.productRows) {
                p.ParentSn = parentSn
                if (p.ItemNo.trim() == this.productName.ProductName.trim()) {
                    p.IsParent = true;
                } else p.IsParent = false;
            }

        console.log(this.productRows);
         this._pikaModuleSerice.save(this.productRows)
             .subscribe(
                 data => console.log('success: ', data),
                 err => console.log('error: ',err)
            )
    }
}

 function setupRows(data: ProductRowSchema[], list: string ): ProductRowSchema[] 
 {
     let newData: ProductRowSchema[] = new Array();
     var nameArray = list.split(',');
     let index = 0;

     for (let i of nameArray) {
         for (let j of data) {
             if(i.indexOf(j.ItemNo.trim())>=0) {
                j.Index = index; 
                index ++;
                newData.push(JSON.parse(JSON.stringify(j))); // cloning                 
                break;
             }
         }
     }
     return newData
 }