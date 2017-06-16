import {IModule, PikaModule} from './PikaModule';

export interface IModuleSchema {
        ItemNo: string,
        ShowSn: boolean,
        ShowMac0: boolean,
        ShowMac1: boolean,
        ShowMac2: boolean,
        ShowMac3: boolean,
        ShowMac4: boolean,
        ShowMac5: boolean,
        ShowUuid0: boolean,
        ShowUuid1: boolean,
        ShowImei0: boolean,
        ShowImei1: boolean,
        ShowImei2: boolean,
        ShowImei3: boolean,
        ShowLicense: boolean
}

// used to tranmit product name and list of modules for creating drop down list of select product and generating 
// SQL Query with list of module schemas to be retreived from server, no support for maps in TS at the time this was made
export interface INameMap {
        ProductName: string,  // name of the device to be added
        ModuleList: string,   // comma seperated list of modules contained in the product, first item in list is the master module i.e.container 
}


// this is a sum of  data and metadata fields and is used to generate each row to for modules
export class ProductRowSchema {

     public Sn: string;
     public ItemNo: string;
     public Desc1: string;
     public MacImei0: string;
     public MacImei1: string;
     public MacImei2: string;
     public MacImei3: string;
     public MacImei4: string;
     public Uuid0: string;
     public Uuid1: string;
     public License: string;
     public ParentSn: string;
     public IsParent: boolean;
     public CreateDt: Date;
     public Scan: string;

     public Index: number;
     public ShowSn: boolean;
     // public showItemNo: boolean;
     public ShowMac0: boolean;
     public ShowMac1: boolean;
     public ShowMac2: boolean;
     public ShowMac3: boolean;
     public ShowMac4: boolean;
     public ShowImei0: boolean;
     public ShowImei1: boolean;
     public ShowImei2: boolean;
     public ShowImei3: boolean;
     public MacImeiPh0: string;  // input box placeholder  
     public MacImeiPh1: string;
     public MacImeiPh2: string;
     public MacImeiPh3: string;
     public MacImeiPh4: string;

     public ShowUuid0: boolean;
     public ShowUuid1: boolean;

     public ShowLicense: boolean;


     constructor (schema: IModuleSchema, parent: boolean) {
        this.Sn = '';
        this.Desc1 = '';
        this.MacImei0 = '';
        this.MacImei1 = '';
        this.MacImei2 = '';
        this.MacImei3 = '';
        this.MacImei4 = '';
        this.Uuid0 = '';
        this.Uuid1 = '';
        this.ParentSn = '';
        this.License = '';
        this.IsParent = parent;
        this.CreateDt = new Date();
        this.Scan = '';

        this.ItemNo = schema.ItemNo;
        this.ShowMac0 = schema.ShowMac0;
        this.ShowMac1 = schema.ShowMac1;
        this.ShowMac2 = schema.ShowMac2;
        this.ShowMac3 = schema.ShowMac3;
        this.ShowMac4 = schema.ShowMac4;
        this.ShowUuid0 = schema.ShowUuid0;
        this.ShowUuid1 = schema.ShowUuid1;
        this.ShowImei0 = schema.ShowImei0;
        this.ShowImei1 = schema.ShowImei1;
        this.ShowImei2 = schema.ShowImei2;
        this.ShowImei3 = schema.ShowImei3;
        this.ShowLicense = schema.ShowLicense;
        this.MacImeiPh0 = this.setPlaceholder(schema.ShowMac0, schema.ShowImei0, '0');
        this.MacImeiPh1 = this.setPlaceholder(schema.ShowMac1, schema.ShowImei1, '1');
        this.MacImeiPh2 = this.setPlaceholder(schema.ShowMac2, schema.ShowImei2, '2');
        this.MacImeiPh3 = this.setPlaceholder(schema.ShowMac3, schema.ShowImei3, '3');
        this.MacImeiPh4 = this.setPlaceholder(schema.ShowMac4, false , '4');



}
        setPlaceholder(ShowMac: boolean, ShowImei: boolean, n: string) {
                var ph: string = 'VOID';
                
                if (ShowMac) ph = 'MAC '+ n;
                if (ShowImei) ph = 'IMEI '+ n;
                
                return ph;
        }

} 

