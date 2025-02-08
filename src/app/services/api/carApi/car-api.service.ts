import { inject, Injectable } from '@angular/core';
import { BASE_URL_TOKEN } from '../../../core/injection-tokens/base-url.token';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../../../models/response.interface';
import { ICar } from '../../../models/car.interface';

@Injectable({
  providedIn: 'root'
})
export class CarApiService {
  private baseUrl = inject(BASE_URL_TOKEN);
  private path = 'cars'
  private http = inject(HttpClient)
  
  getAllCars():Observable<IResponse<ICar[]>>{
    return this.http.get<IResponse<ICar[]>>(`${this.baseUrl}/${this.path}/getAllCars`);
  }

  deleteCar(id:string):Observable<IResponse<string>>{
    return this.http.delete<IResponse<string>>(`${this.baseUrl}/${this.path}/deleteCar?id=${id}`);
  }
}
