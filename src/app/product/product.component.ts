import {Component, Input}from '@angular/core';
import {PikaModule} from '../pikaModule/PikaModule'

@Component ({
    selector: 'pm-product',
    templateUrl: 'product.component.html'
})
export class ProductComponent {
    @Input() product: PikaModule; 
}