import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../constants';
import { ResultModel } from '../models/result.model';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private error: ErrorService
  ) { }

  get<T>(endPoint: string, callBack: (res:T)=> void, errorCallBack?: ()=> void){
    this.http.get<ResultModel<T>>(`${api}/${endPoint}`,{
      headers: {
        "Authorization": `Bearer `
      }
    }).subscribe({
      next: (res)=> {
        callBack(res.data!);
      },
      error: (err: HttpErrorResponse)=> {
        if(errorCallBack){
          errorCallBack();
        }

        this.error.errorHandler(err);
      }
    });
  }

  post<T>(endPoint: string, body:any, callBack: (res:T)=> void, errorCallBack?: ()=> void){
    this.http.post<ResultModel<T>>(`${api}/${endPoint}`, body,{
      headers: {
        "Authorization": `Bearer `
      }
    }).subscribe({
      next: (res)=> {
        callBack(res.data!);
      },
      error: (err: HttpErrorResponse)=> {
        if(errorCallBack){
          errorCallBack();
        }

        this.error.errorHandler(err);
      }
    });
  }
}
