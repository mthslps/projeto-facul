import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../model/question';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { QuestionService } from '../services/question.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionModalContent } from './question-modal.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  
  questions: Question[];
  submitted: boolean;
  msg: boolean;

  constructor(private router: Router, private QuestionService: QuestionService, private modalService: NgbModal, route: ActivatedRoute) { 
      // override the route reuse strategy
      this.router.routeReuseStrategy.shouldReuseRoute = function(){
         return false;
      }
 
      this.router.events.subscribe((evt) => {
         if (evt instanceof NavigationEnd) {
            // trick the Router into believing it's last link wasn't previously loaded
            this.router.navigated = false;
            // if you need to scroll back to top, here is the right place
            window.scrollTo(0, 0);
         }
     });
  }

  ngOnInit() {
    this.QuestionService.getQuestions().subscribe(dados => this.questions = dados);
  }

  
  open(question) {
    const modalRef = this.modalService.open(QuestionModalContent, {size: 'lg'});
    modalRef.componentInstance.data = question;
    modalRef.componentInstance.topic = question.topic;
    modalRef.componentInstance.imgUrl = question.imgUrl;
    modalRef.componentInstance.question = question.question;
    modalRef.componentInstance.dificulty = question.dificulty;
    modalRef.componentInstance.id = question.id;
    modalRef.componentInstance.correctAlternative = question.correctAlternative;
    modalRef.componentInstance.alternative1 = question.alternative1;
    modalRef.componentInstance.alternative2 = question.alternative2;
    modalRef.componentInstance.alternative3 = question.alternative3;
    modalRef.componentInstance.alternative4 = question.alternative4;
    modalRef.componentInstance.alternative5 = question.alternative5;

    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

}
