import {ProductRowSchema} from './productSchema';

export interface IModule {
        Id?: number,
        Sn: string,
        ItemNo: string,
        Desc1: string,
        MacImei0: string,
        MacImei1: string,
        MacImei2: string,
        MacImei3: string,
        MacImei4: string,
        Uuid0: string,
        Uuid1: string,
        
        License: string,
        ParentSn: string,
        ParentId?: number,
        IsParent: boolean,
        CreateDt: Date,
}

export class PikaModule implements IModule{
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

  constructor ( d: ProductRowSchema) {
    this.Sn = d.Sn;
    this.ItemNo = d.ItemNo;
    this.Desc1 = d.Desc1;
    this.MacImei0 = d.MacImei0;
    this.MacImei1 = d.MacImei1;
    this.MacImei2 = d.MacImei2;
    this.MacImei3 = d.MacImei3;
    this.MacImei4 = d.MacImei4;
    this.Uuid0 = d.Uuid0;
    this.Uuid1 = d.Uuid1;
    this.License = d.License;
    this.ParentSn =d.ParentSn;
    this.IsParent = d.IsParent;
    this.CreateDt = new Date();
  }  

  public clearValues(): void {
    this.Sn = '';
    this.ItemNo = '';
    this.Desc1 = '';
    this.MacImei0 = '';
    this.MacImei1 = '';
    this.MacImei2 = '';
    this.MacImei3 = '';
    this.MacImei4 = '';
    this.Uuid0 = '';
    this.Uuid1 = '';
    this.License = '';
    this.ParentSn ='';
    // this.IsParent // this needs to be handled in WriteToDB function 
    this.CreateDt = new Date();
  }
}