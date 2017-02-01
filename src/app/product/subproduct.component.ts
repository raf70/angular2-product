import {Component, Input, Output, EventEmitter}from '@angular/core';
import {NgForm} from '@angular/forms';
import {IModule, PikaModule} from '../models/PikaModule';
import {IModuleSchema, INameMap, ProductRowSchema} from '../models/productSchema';

@Component ({
    selector: 'pm-subproduct',
    templateUrl: 'subproduct.component.html'
})
export class SubProductComponent {
  @Input()  product: ProductRowSchema;
  @Output() event: EventEmitter<ProductRowSchema> =
                new EventEmitter<ProductRowSchema>();

  onClick(){ this.event.emit(this.product);}


}
