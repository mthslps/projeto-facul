import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Question } from '../model/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}

    private readonly API = environment.API_GATEWAY;

    getQuestions() {
        this.spinner.show();
        return this.http.get<Question>(this.API + '/questions').pipe(
            map((response: any) => {
                this.spinner.hide();
                return response ? response : null;
            })
        );
    }

    updateQuestion(question: Question, document) {
      debugger;
      return this.http.put(this.API + '/questions/' + question.id, JSON.stringify({question, document}));
    }

    saveQuestion(question) {
      return this.http.post(this.API + '/questions', question);
    }
    bySubjectId(subjectList){
      return this.http.post(this.API + '/questions/bysubjectid', { 'ids': subjectList}).pipe(
        map((response: any) => {
          return response
        })
      )
    }
}
