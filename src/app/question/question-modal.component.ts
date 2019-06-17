import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Question } from '../model/question';
import {Router} from "@angular/router";
import { QuestionService } from '../services/question.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditQuestionModal } from './edit-question-modal.component';

@Component({
    selector: 'ngbd-modal-content',
    template: `
      <div class="modal-header">
        <h4 class="modal-title">Questão {{id}} - {{topic}} - {{dificulty}} - {{data.subject.name}}</h4>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <img [src]="imgUrl" style="max-width:300px;max-height:300px;margin-bottom: 20px; margin-left: 30%;"/>
        <p style="font-size: 1vw;">QUESTÃO {{id}} - {{question}}</p>
        <ul class="alternatives">
          <li>Alternativa A - {{alternative1}}</li>
          <li>Alternativa B - {{alternative2}}</li>
          <li>Alternativa C - {{alternative3}}</li>
          <li>Alternativa D - {{alternative4}}</li>
          <li>Alternativa E - {{alternative5}}</li>
        </ul>
        <p style="font-size: 1vw; margin-top:5px;">Alternativa correta: {{correctAnswer}} </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Fechar</button>
        <button type="button" class="btn btn-outline-dark" (click)="test((data))">Editar</button>
      </div>
    `
  })
  export class QuestionModalContent {
    correctAnswer:string;
    @Input() data: Question;
    @Input() id;
    @Input() question;
    @Input() topic;
    @Input() imgUrl;
    @Input() correctAlternative;
    @Input() dificulty;
    @Input() alternative1;
    @Input() alternative2;
    @Input() alternative3;
    @Input() alternative4;
    @Input() alternative5;
  
    constructor(public activeModal: NgbActiveModal,private QuestionService: QuestionService,private zone: NgZone,private router: Router, private modalService: NgbModal) {}
    ngOnInit(){
      switch(this.correctAlternative){
        case "alternative1": {
          this.correctAnswer = this.alternative1;
          break;  
        }
        case "alternative2": {
          this.correctAnswer = this.alternative2;
          break;  
        }
        case "alternative3": {
          this.correctAnswer = this.alternative3;
          break;  
        }
        case "alternative4": {
          this.correctAnswer = this.alternative4;
          break;  
        }
        case "alternative5": {
          this.correctAnswer = this.alternative5;
          break;  
        }
      }
    }
    test(question) {
        this.activeModal.close('Close click')
        const modalRef = this.modalService.open(EditQuestionModal, {size: 'lg'});
        modalRef.componentInstance.data = question;
        modalRef.componentInstance.imgUrl = question.imgUrl;
        modalRef.componentInstance.topic = question.topic;
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
          this.router.navigate(['/questions']);
        }).catch((error) => {
          console.log(error);
        });
    }

  }