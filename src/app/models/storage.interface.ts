import { EStorageEnum } from "../core/enums/storage.enum";

export interface IStorageModel {
    getStorageElement(name:EStorageEnum):any;
    setStorageElement(name:EStorageEnum, value:any): any
    removeStorageElement(name:EStorageEnum): any
}
