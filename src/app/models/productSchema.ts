import {IModule, PikaModule} from './PikaModule';

export interface IModuleSchema {
        ItemNo: string,
        ShowSn: boolean,
        ShowMac0: boolean,
        ShowMac1: boolean,
        ShowUuid0: boolean,
        ShowUuid1: boolean,
        ShowImei0: boolean,
        ShowImei1: boolean,
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
     public Mac0: string;
     public Mac1: string;
     public Uuid0: string;
     public Uuid1: string;
     public Imei0: string;
     public Imei1: string;
     public ParentSn: string;
     public IsParent: boolean;
     public CreateDt: Date;

     public ShowSn: boolean;
     // public showItemNo: boolean;
     public ShowMac0: boolean;
     public ShowMac1: boolean;
     public ShowUuid0: boolean;
     public ShowUuid1: boolean;
     public ShowImei0: boolean;
     public ShowImei1: boolean;


     constructor (schema: IModuleSchema, parent: boolean) {
        this.Sn = '';
        this.Desc1 = '';
        this.Mac0 = '';
        this.Mac1 = '';
        this.Uuid0 = '';
        this.Uuid1 = '';
        this.Imei0 = '';
        this.Imei1 = '';
        this.ParentSn = '';
        this.IsParent = parent;
        this.CreateDt = new Date();

        this.ItemNo = schema.ItemNo;
        this.ShowMac0 = schema.ShowMac0;
        this.ShowMac1 = schema.ShowMac1;
        this.ShowUuid0 = schema.ShowUuid0;
        this.ShowUuid1 = schema.ShowUuid1;
        this.ShowImei0 = schema.ShowImei0;
        this.ShowImei1 = schema.ShowImei1;
        }
} 

