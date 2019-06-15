import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from '../model/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}

    private readonly API = environment.API_GATEWAY;

    getSubjects() {
        this.spinner.show();
        return this.http.get<Subject>(this.API + '/subjects').pipe(
            map((response: any) => {
                this.spinner.hide();
                return response ? response : null;
            })
        );
    }

    saveSubject(subject) {
        return this.http.post(this.API + '/subjects', subject);
    }
}
