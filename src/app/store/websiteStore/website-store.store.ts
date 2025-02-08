import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { IWebsiteStore } from './website-store.interface';

const initValue = () : IWebsiteStore =>{
  return {
    blogs:[],
    blogsCount:0,
    faqs:[],
  }
}
@Injectable({
  providedIn: 'root'
})
@StoreConfig({name:'WebsiteStore', resettable: true})
export class WebsiteStore extends Store<IWebsiteStore> {

  constructor() { super(initValue()) }
}
