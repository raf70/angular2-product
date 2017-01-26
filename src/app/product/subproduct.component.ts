import {Component, Input, Output, EventEmitter}from '@angular/core';
import {NgForm} from '@angular/forms';
import {IModule, PikaModule} from '../pikaModule/PikaModule';
import {PikaModuleService} from '../pikaModule/pikaModule.service';

@Component ({
    selector: 'pm-subproduct',
    templateUrl: 'subproduct.component.html'
})
export class SubProductComponent {
  @Input()  product: PikaModule;
  @Output() event: EventEmitter<PikaModule> =
                new EventEmitter<PikaModule>();

  onClick(){ this.event.emit(this.product);}


}
