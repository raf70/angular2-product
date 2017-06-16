import { Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ProductListComponent } from "./productList/product-list.component";
import { ProductComponent } from "./product/product.component";
import { DeviceComponent } from "./device/device.component";
import { DeviceScanComponent } from "./device/device-scan.component";
import {SignupFormComponent} from './login/signup-form.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'device', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'productList', component: ProductListComponent  },
  { path: 'product', component: ProductComponent  },
  { path: 'device', component: DeviceComponent  },
  { path: 'deviceScan', component: DeviceScanComponent  },
  { path: 'contact', component: ContactComponent },
  { path: 'signup', component: SignupFormComponent}

];

