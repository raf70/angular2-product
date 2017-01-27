import {Component} from '@angular/core';

import {PikaModuleService, ProductMetadataService} from './services/db.service';
//import {PikaModuleService} from './pikaModule/pikaModule.service';
//import {ProductMetadataService} from './product/productMetadata.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  providers: [PikaModuleService, ProductMetadataService]
})

export class AppComponent {
}
