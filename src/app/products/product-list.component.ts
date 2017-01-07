import {Component}from '@angular/core';
import {ProductComponent} from '../product/product.component';
import {PikaModule} from '../pikaModule/PikaModule'

@Component ({
    selector: 'pm-products',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent {

    title: string ="Product List"
    
    products: PikaModule[] = [
        {
            "id": 2,
            "pn": "PIK-APP-000123",
            "sn": "123456",
            "desc1": "PIKA application server",
            "mac0": "00:11:22:33:44:55:66:77",
            "mac1": "00:11:22:33:44:55:66:77",
            "mac2": "00:11:22:33:44:55:66:77",
            "imei0": "imei0blahblahblahblah",
            "imei1": "imei1blahblahblahblah",
            "imei2": "imei2blahblahblahblah",
            "imei3": "imei3blahblahblahblah",
            "uuid0": "",
            "uuid1": "",
            "parentId": 2,
            "parentSn": "123456",
            "isParent": true,
            "createDt": new Date()            
        }
    ]
    name: string = "WARP 5";
    sn: string = "";
}