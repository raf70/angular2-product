export class PikaModule {
    constructor(
        public id: number,
        public parentId: number,
        public item_no: string,
        public desc: string,
        public sn: string,
        public parentSn: string
    ){}
}