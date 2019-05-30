import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  constructor( private fb: FormBuilder,  private QuestionService: QuestionService) { }

  submitted: boolean;
  private formCadastro;
  msg: boolean;

  ngOnInit() {
    this.createForm();

    this.msg = false;
  }
  createForm() {
    this.formCadastro = this.fb.group({
      question: new FormControl('', Validators.required),
      imgUrl: new FormControl(''),
      topic: new FormControl('', Validators.required),
      dificulty: new FormControl('', Validators.required),
      subjectId: new FormControl(''),
      isActive: new FormControl(''),
      alternative1: new FormControl('', Validators.required),
      alternative2: new FormControl('', Validators.required),
      alternative3: new FormControl('', Validators.required),
      alternative4: new FormControl('', Validators.required),
      alternative5: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.submitted = true;
    Object.keys(this.formCadastro.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.formCadastro.get(key).errors;
      if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
              console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
            });
          }
        });
    if (this.formCadastro.valid) {
      const register = this.formCadastro.value;
      register.set('question.isActive', true);
      register.set('question.subjectId', 11);
      console.log(register);
      debugger;
      this.QuestionService.saveQuestion(register)
      .subscribe(
        data => {
          this.submitted = false;
          this.msg = true;
          this.createForm();
        },
        error => {
            console.log('Error', error);
        }
      );
    }
  }

}
