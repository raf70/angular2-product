import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { ProductListComponent } from './productList/product-list.component';
import { ProductComponent } from './product/product.component';
import { SubProductComponent } from './product/subproduct.component';
import { DeviceComponent } from './device/device.component';
import { DeviceScanComponent } from './device/device-scan.component';
import { ProductFilterPipe } from './productList/product-filter.pipe';
import {SignupFormComponent} from './login/signup-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    ProductListComponent,
    ProductComponent,
    SubProductComponent,
    DeviceComponent,
    DeviceScanComponent,
    ProductFilterPipe,
    SignupFormComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
