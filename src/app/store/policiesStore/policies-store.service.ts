import { DestroyRef, Injectable, inject } from '@angular/core';
import { PoliciesStore } from './policies-store.store';
import { PoliciesApiService } from '../../services/api/policiesApi/policies-api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PlatformService } from '../../services/platform/platform.service';

@Injectable({
  providedIn: 'root'
})
export class PoliciesStoreService {
  private api = inject(PoliciesApiService);
  private platformService = inject(PlatformService)
  private store = inject(PoliciesStore);

  getAllPolicies(ref:DestroyRef){
    this.store.setLoading(true)
    return this.api.getAllPolicies().pipe(takeUntilDestroyed(ref)).subscribe({
        next:(res)=>{
            this.store.update({
              policies:res
            })
        },
        complete:()=>{this.store.setLoading(false)},
        error:(err)=>{
          this.store.setLoading(false)
        }
    })
  }
  getPolicyFile(id:string, ref:DestroyRef){
    this.store.update({fileIsLoading: true})
    return this.api.getPolicyFile(id).pipe(takeUntilDestroyed(ref)).subscribe({
        next:(res)=>{
          this.store.update({fileIsLoading: false})
          const fileData = res.policyFile;
          const byteString = this.platformService.isPlatformBrowser() && window.atob(fileData) || '';
          const byteArray = new Uint8Array(byteString.length);
          for (let i = 0; i < byteString.length; i++) {
            byteArray[i] = byteString.charCodeAt(i);   
          }
          const blob = new Blob([byteArray], {type: 'application/pdf'});
          const blobUrl = URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.href = blobUrl;
          anchor.download = `${id}.pdf`;
          anchor.click();
          URL.revokeObjectURL(blobUrl);
        },
        complete:()=>{
          this.store.update({fileIsLoading: false})
        },
        error:(err)=>{
          this.store.update({fileIsLoading: false})
        }
    })
  }
  resetStore(){
    this.store.update({
      policies:[]
    })
  }
}
