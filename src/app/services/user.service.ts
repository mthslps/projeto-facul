import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../model/user';

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}

    private readonly API = environment.API_GATEWAY;

    getUsers() {
        return this.http.get<User>(this.API + '/users').pipe(
            map((response: any) => {
                this.spinner.hide();
                return response ? response : null;
            })
        );
    }

    saveUser(user) {
        return this.http.post(this.API + '/users', user);
    }
}
