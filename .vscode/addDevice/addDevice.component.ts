import {Component, EventEmitter}from '@angular/core';
import {IModule} from '../pikaModule/PikaModule'

@Component ({
    selector: 'pm-addDevice',
    templateUrl: 'addDevice.component.html'
})
export class AddDeviceComponent{
    modules: IModule[];
    
}