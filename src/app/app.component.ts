import {Component} from '@angular/core';

import {PikaModuleService} from './pikaModule/pikaModule.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  providers: [PikaModuleService]
})

export class AppComponent {
}
