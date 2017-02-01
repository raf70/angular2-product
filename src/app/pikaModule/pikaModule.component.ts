import {Component, Input, Output, EventEmitter}from '@angular/core';
import {IModule,} from '../models/PikaModule';
import {ProductRowSchema} from '../models/productSchema';

@Component ({
    selector: 'pm-module',
    templateUrl: 'PikaModule.component.html'
})
export class PikaModuleComponent{
    @Input() product: ProductRowSchema;
    @Output() notify: EventEmitter<ProductRowSchema> = 
            new EventEmitter<ProductRowSchema>(); 
    
    ngOnChanges(): void {
        // not sure if we need this...
    }
}