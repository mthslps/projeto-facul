import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}

    private readonly API = environment.API_GATEWAY;

    getCourses() {
        return this.http.get<Course>(this.API + '/courses').pipe(
            map((response: any) => {
                this.spinner.hide();
                return response ? response : null;
            })
        );
    }

    saveCourse(course) {
      return this.http.post(this.API + '/courses', course);
  }
}
