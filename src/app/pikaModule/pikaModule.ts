export class PikaModule {
    constructor(
        public id: number,
        public sn: string,
        public pn: string,
        public desc1: string,
        public mac0: string,
        public mac1: string,
        public mac2: string,
        public uuid0: string,
        public uuid1: string,
        public imei0: string,
        public imei1: string,
        public imei2: string,
        public imei3: string,
        public parentSn: string,
        public parentId: number,
        public isParent: boolean,
        public createDt: Date
    ){}
}