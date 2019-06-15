import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Test } from '../model/test';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  private readonly API = environment.API_GATEWAY;

  getTests() {
    this.spinner.show();
    return this.http.get<Test>(this.API + '/tests').pipe(
      map((response: any) => {
        this.spinner.hide();
        return response ? response : null;
      })
    );
  }

}
