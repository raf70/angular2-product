import {Component, Input, Output, EventEmitter}from '@angular/core';
import {IModule} from './PikaModule'

@Component ({
    selector: 'pm-module',
    templateUrl: 'PikaModule.component.html'
})
export class PikaModuleComponent{
    @Input() module: IModule;
    @Output() notify: EventEmitter<IModule> = 
            new EventEmitter<IModule>(); 
    
    ngOnChanges(): void {
        // not sure if we need this...
    }
}