export interface IModule {
        Id?: number,
        Sn: string,
        ItemNo: string,
        Desc1: string,
        Mac0: string,
        Mac1: string,
       // Mac2: string,
        Uuid0: string,
        Uuid1: string,
        Imei0: string,
        Imei1: string,
        //imei2: string,
        //imei3: string,
        ParentSn: string,
        ParentId?: number,
        IsParent: boolean,
        CreateDt: Date,
        DisplayName: String,
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
     //public IsParent: boolean;
     public CreateDt: Date;

  constructor ( public DisplayName: string, public IsParent: boolean ) {
    this.Sn = '';
    this.ItemNo = '';
    this.Desc1 = '';
    this.Mac0 = '';
    this.Mac1 = '';
    this.Uuid0 = '';
    this.Uuid1 = '';
    this.Imei0 = '';
    this.Imei1 = '';
    this.ParentSn ='';
    //this.IsParent = false;
    this.CreateDt = new Date();
  }  
}