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
    ver: string = "- ver 0.2c"
}

/*

0.2a - April 17, 2017 - bug fix; updated uWARP code scan to scan MAC0 to Sn. 
0.2b - June 13, 2017 - added parser for 2 more modules
0.2c - June 16, 2017 - fixed parser issues


*/