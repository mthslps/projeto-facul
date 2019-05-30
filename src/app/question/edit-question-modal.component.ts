import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Question } from '../model/question';
import { Router } from "@angular/router";
import { NotifierService } from 'angular-notifier';
import { QuestionService } from '../services/question.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './edit-question-modal.component.html',
})
export class EditQuestionModal implements OnInit {
  @Input() id;
  @Input() data;
  @Input() question;
  @Input() topic;
  @Input() dificulty;
  @Input() alternative1;
  @Input() alternative2;
  @Input() alternative3;
  @Input() alternative4;
  @Input() alternative5;
  private readonly notifier: NotifierService;

  constructor(notifierService: NotifierService,private fb: FormBuilder,private router: Router, public activeModal: NgbActiveModal, private QuestionService: QuestionService) {
    this.notifier = notifierService;
   }

  submitted: boolean;
  private formEditQuestion;
  msg: boolean;

  ngOnInit() {
    // debugger;
    this.createForm();
    this.notifier.notify( 'success', 'YAAou are awesome! I mean it!' );

    this.msg = false;
  }

  createForm() {
    this.formEditQuestion = this.fb.group({
      id: [],
      imgUrl: [],
      subjectId:[],
      isActive:[],
      subject:[],
      question: new FormControl('', Validators.required),
      topic: new FormControl('', Validators.required),
      dificulty: new FormControl('', Validators.required),
      alternative1: new FormControl('', Validators.required),
      alternative2: new FormControl('', Validators.required),
      alternative3: new FormControl('', Validators.required),
      alternative4: new FormControl('', Validators.required),
      alternative5: new FormControl('', Validators.required),
    });

    this.formEditQuestion.setValue(this.data);
  }

  onSubmit() {
    this.submitted = true;
    Object.keys(this.formEditQuestion.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.formEditQuestion.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
    if (this.formEditQuestion.valid) {
      const question = this.formEditQuestion.value;

      this.QuestionService.updateQuestion(question)
        .subscribe(
          data => {
            this.submitted = false;
            this.msg = true;
            this.notifier.notify('success', 'You are awesome! I mean it!' );
            this.activeModal.close('Close click edit');
            
          },
          error => {
            console.log('Error', error);
          }
        );
      }
    }
    test() {
      this.activeModal.close('Close click')
    }
}