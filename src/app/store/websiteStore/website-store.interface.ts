import { IBlog } from "../../models/blog.interface";
import { IFaq } from "../../models/faq.interface";

export interface IWebsiteStore{
  blogs?: IBlog[],
  blog?: IBlog,
  blogsCount?:number,
  isContacting?:boolean,
  faqs:IFaq[]
}