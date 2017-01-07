import {Component}from '@angular/core';
import {ProductComponent} from '../product/product.component';

@Component ({
    selector: 'pm-products',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent {

    title: string ="Product List"
    
    products: any[] = [
        {
            "id": 2,
            "pn": "PIK-APP-000123",
            "sn": "123456",
            "description": "PIKA application server",
            "mac0": "00:11:22:33:44:55:66:77",
            "mac1": "00:11:22:33:44:55:66:77",
            "mac3": "00:11:22:33:44:55:66:77",
            "imei0": "imei0blahblahblahblah",
            "imei1": "imei1blahblahblahblah",
            "imei2": "imei2blahblahblahblah",
            "imei3": "imei3blahblahblahblah",
            "parent": 2             
        },
         {
            "id": 1,
            "pn": "PIK-APP-000123",
            "sn": "123456",
            "description": "PIKA application server",
            "mac0": "00:11:22:33:44:55:66:77",
            "mac1": "00:11:22:33:44:55:66:77",
            "mac3": "00:11:22:33:44:55:66:77",
            "imei0": "imei0blahblahblahblah",
            "imei1": "imei1blahblahblahblah",
            "imei2": "imei2blahblahblahblah",
            "imei3": "imei3blahblahblahblah",
            "parent": 2             
        },
        {
            "id": 3,
            "pn": "PIK-99-000123",
            "sn": "baby123456",
            "description": "PIKA server plugin",
            "mac0": "00:11:22:33:44:55:66:77",
            "mac1": "00:11:22:33:44:55:66:77",
            "mac3": "00:11:22:33:44:55:66:77",
            "imei0": "imei0blahblahblahblah",
            "imei1": "imei1blahblahblahblah",
            "imei2": "imei2blahblahblahblah",
            "imei3": "imei3blahblahblahblah",
            "parent": 2             
        }
    ]
    name: string = "WARP 5";
    sn: string = "";
}