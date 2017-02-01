import {ProductRowSchema} from './productSchema';

export interface IModule {
        Id?: number,
        Sn: string,
        ItemNo: string,
        Desc1: string,
        Mac0: string,
        Mac1: string,
        Uuid0: string,
        Uuid1: string,
        Imei0: string,
        Imei1: string,
        ParentSn: string,
        ParentId?: number,
        IsParent: boolean,
        CreateDt: Date,
}

export class PikaModule implements IModule{
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

  constructor ( d: ProductRowSchema) {
    this.Sn = d.Sn;
    this.ItemNo = d.ItemNo;
    this.Desc1 = d.Desc1;
    this.Mac0 = d.Mac0;
    this.Mac1 = d.Mac1;
    this.Uuid0 = d.Uuid0;
    this.Uuid1 = d.Uuid1;
    this.Imei0 = d.Imei0;
    this.Imei1 = d.Imei1;
    this.ParentSn =d.ParentSn;
    this.IsParent = d.IsParent;
    this.CreateDt = new Date();
  }  
}