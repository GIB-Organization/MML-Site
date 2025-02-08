import { Injectable, inject } from '@angular/core';
import { WebsiteStore } from './website-store.store';
import { IErrorResponse } from '../../models/response.interface';
import { ToasterService } from '../../services/toaster/toaster.service';
import { WebsiteApiService } from '../../services/api/websiteApi/website-api.service';
import { IContactUs } from '../../models/contactUs.interface';
import { take } from 'rxjs';
import { IPagination } from '../../models/layout-models/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class WebsiteStoreService {
  private api = inject(WebsiteApiService);
  private store = inject(WebsiteStore);
  private toaster = inject(ToasterService);

  contactUs(data:IContactUs, callback?:any){
    this.store.update({isContacting:true})
    return this.api.contactUs(data).pipe(take(1)).subscribe({
        next:()=>{
          this.store.update({isContacting:false})
          this.toaster.addSuccess('views.contact.messageRecieved');
          callback()
        },
        complete:()=>{this.store.update({isContacting:false})},
        error:(err:IErrorResponse)=>{this.store.update({isContacting:false})}
    })
  }
  
  getFaqs(){
    return this.api.getFaqs().pipe(take(1)).subscribe({
      next:(res)=>{
        this.store.update({faqs:res.result})
        this.store.setLoading(false)
      },
      complete:()=>{this.store.setLoading(false)},
      error:(err:IErrorResponse)=>{this.store.setLoading(false)}
  })
}
  getAllBlogs(data:IPagination){
    this.store.setLoading(true)
    return this.api.getAllBlogs(data).pipe(take(1)).subscribe({
        next:(res)=>{
          this.store.update({
            blogs: res.result.data,
            blogsCount: res.result.totalRecords
          })
          this.store.setLoading(false)
        },
        complete:()=>{this.store.setLoading(false)},
        error:(err:IErrorResponse)=>{this.store.setLoading(false)}
    })
  }
  getBlogBySlug(slug:string, callback?:any){
    this.store.setLoading(true)
    return this.api.getBlogBySlug(slug).pipe(take(1)).subscribe({
        next:(res)=>{
          this.store.update({blog:res.result})
          this.store.setLoading(false)
          callback();
        },
        complete:()=>{this.store.setLoading(false)},
        error:(err:IErrorResponse)=>{this.store.setLoading(false)}
    })
  }
}
