import {Component, OnInit}from '@angular/core';
import {ProductComponent} from '../product/product.component';
import {IModule} from '../pikaModule/pikaModule';
import {PikaModuleService} from '../pikaModule/pikaModule.service';


@Component ({
    selector: 'pm-products',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent {

    title: string ="Product List";
    modules: IModule[];
    errorMessage: string;

    constructor(private _pikaModuleService: PikaModuleService) {

    }
    

    ngOnInit(): void {


       this._pikaModuleService.getAll()
       .subscribe(
          modules => this.modules = modules,
          error => this.errorMessage = <any>error);
    }
  
}