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
        PrentSn: string,
        ParentId?: number,
        IsParent: boolean,
        CreateDt: Date
}

export class PikaModule implements IModule{
  constructor ( 
     public Sn: string,
     public ItemNo: string,
     public Desc1: string,
     public Mac0: string,
     public Mac1: string,
     public Uuid0: string,
     public Uuid1: string,
     public Imei0: string,
     public Imei1: string,
     public PrentSn: string,
     public IsParent: boolean,
     public CreateDt: Date
  ) {}  
}