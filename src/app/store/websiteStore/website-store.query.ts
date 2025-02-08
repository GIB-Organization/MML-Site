import { inject, Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { IWebsiteStore } from './website-store.interface';
import { WebsiteStore } from './website-store.store';
import { LanguageService } from '../../services/language/language.service';
import { IFaqDescriptionLang, IFaqTitleLang } from '../../models/faq.interface';
import { IBlogDescriptionLang, IBlogTitleLang } from '../../models/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class WebsiteStoreQuery extends Query<IWebsiteStore> {
  translate = inject(LanguageService);
  constructor(private _store: WebsiteStore) { 
    super(_store)
  }

  get blogs$(){
    return this.select(state=> state.blogs);
  }
  get blog$(){
    return this.select(state=> state.blog);
  }
  get blog(){
    return this._store.getValue().blog;
  }
  get blogTitleKey():IBlogTitleLang{
    return this.translate.handleBackendLocalKeys('title')
  }
  get blogDescKey():IBlogDescriptionLang{
    return this.translate.handleBackendLocalKeys('description')
  }
  get isContacting$(){
    return this.select(state=> state.isContacting);
  }
  get blogsCount(){
    return this._store.getValue().blogsCount??0
  }
  get faqs(){
    return this._store.getValue().faqs??[]
  }
  get faqs$(){
    return this.select(state=> state.faqs);
  }
  get faqTitleKey():IFaqTitleLang{
    return this.translate.handleBackendLocalKeys('title')
  }
  get faqDescKey(): IFaqDescriptionLang{
    return this.translate.handleBackendLocalKeys('description')
  }
}
