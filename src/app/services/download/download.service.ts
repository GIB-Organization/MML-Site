import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { take } from 'rxjs';
import { PlatformService } from '../platform/platform.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private http = inject(HttpClient);
  private platform = inject(PlatformService);

  downloadFileByUrl(url: string) {
    return this.http.get(url, {responseType: 'blob'}).subscribe({
      next:(blob)=> {
        if(this.platform.isPlatformBrowser()){
          const a = document.createElement('a')
          const objectUrl = URL.createObjectURL(blob)
          a.href = objectUrl;
          a.download = 'archive.pdf';
          a.click();
          URL.revokeObjectURL(objectUrl);
        }
      },
      error:(err)=> console.log(err)
    })
  }
}
