import { inject, Injectable } from '@angular/core';
import { BASE_URL_TOKEN } from '../../../core/injection-tokens/base-url.token';
import { HttpClient } from '@angular/common/http';
import { IContactUs } from '../../../models/contactUs.interface';
import { IPagingResponse, IResponse } from '../../../models/response.interface';
import { Observable } from 'rxjs';
import { IFaq } from '../../../models/faq.interface';
import { IBlog } from '../../../models/blog.interface';
import { IPartner } from '../../../models/partner.interface';
import { FilterApiService } from '../filterApi/filter-api.service';
import { IFilter } from '../../../models/layout-models/filter.interface';

@Injectable({
  providedIn: 'root'
})
export class WebsiteApiService {
  private baseUrl = inject(BASE_URL_TOKEN);
  private filterApiService = inject(FilterApiService);
  private basicInfoPath = 'mmp'
  private blogPath = 'blogs'
  private partnersPath = 'partners'
  private http = inject(HttpClient)

  contactUs(data:IContactUs):Observable<IResponse<null>>{
    return this.http.post<IResponse<null>>(`${this.baseUrl}/${this.basicInfoPath}/contactUs`, data);
  }
  getFaqs():Observable<IResponse<IFaq[]>>{
    return this.http.get<IResponse<IFaq[]>>(`${this.baseUrl}/${this.basicInfoPath}/faqs`);
  }
  getAllPartners():Observable<IResponse<IPartner[]>>{
    return this.http.get<IResponse<IPartner[]>>(`${this.baseUrl}/${this.partnersPath}/getAllPartners`);
  }
  getBlogBySlug(slug:string):Observable<IResponse<IBlog>>{
    return this.http.get<IResponse<IBlog>>(`${this.baseUrl}/${this.blogPath}/getBySlug?slug=${slug}`);
  }
  getAllBlogs(data:IFilter):Observable<IPagingResponse<IBlog[]>>{
    return this.filterApiService.getFilteredData(`${this.baseUrl}/${this.blogPath}/getAllBlogs`, data)
  }
}
