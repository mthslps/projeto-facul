import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Question } from '../model/question';
import { Router } from "@angular/router";
import { NotifierService } from 'angular-notifier';
import { QuestionService } from '../services/question.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './edit-question-modal.component.html',
})
export class EditQuestionModal implements OnInit {
  @Input() id;
  @Input() data;
  @Input() question;
  @Input() imgUrl;
  @Input() topic;
  @Input() dificulty;
  @Input() alternative1;
  @Input() alternative2;
  @Input() alternative3;
  @Input() alternative4;
  @Input() alternative5;
  @Input() correctAlternative;
  private readonly notifier: NotifierService;

  constructor(notifierService: NotifierService,private fb: FormBuilder,private router: Router, public activeModal: NgbActiveModal, private QuestionService: QuestionService) {
    this.notifier = notifierService;
   }

  submitted: boolean;
  document: any;
  public formEditQuestion;
  msg: boolean;

  ngOnInit() {
    //  
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
      correctAlternative: new FormControl(''),
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

      this.QuestionService.updateQuestion(question, this.document)
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
    handleInputChange(e) {
      if(e.target.files[0].size > 1000000){
        alert('Somente válido imagens com tamanho menor que 1Mb')
        return false;
      }else{
         
        var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        var pattern = /image-*/;
        var reader = new FileReader();
        if (!file.type.match(pattern)) {
          alert('Formato invalido');
          return false;
        }
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
      }
    }
    _handleReaderLoaded(e) {
       
      let reader = e.target;
      this.formEditQuestion.value.imgUrl = reader.result;
    }
}