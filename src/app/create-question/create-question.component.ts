import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { QuestionService } from '../services/question.service';
import { Subject } from '../model/subject';
import { SubjectService } from '../services/subject.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  constructor( private fb: FormBuilder,  private QuestionService: QuestionService, private router: Router, private SubjectService: SubjectService) { }

  submitted: boolean;
  private formCadastro;
  msg: boolean;
  subjectList: Subject[];
  dificultyList: String[];
  alternativeList: String[];

  ngOnInit() {
    this.createForm();
    this.SubjectService.getSubjects().subscribe(dados => this.subjectList = dados);
    this.alternativeList = ['Alternativa 1', 'Alternativa 2', 'Alternativa 3', 'Alternativa 4', 'Alternativa 5'];
    this.dificultyList = ["Fácil", "Médio", "Difícil"];
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
      alternative5: new FormControl('', Validators.required),
      correctAlternative: new FormControl('', Validators.required)
    });
  }
  selectedSubject(data){
    if(data){
      this.formCadastro.value.subjectId = data.id
    }
  }
  selectedDificulty(data){
    if(data){
      this.formCadastro.value.dificulty = data
    }
  }
  selectedCorrectAlternative(data){
    if(data){
      var arr = data.split("");
      arr.splice(10, 1, 'e');
      var result = arr.join("");
      this.formCadastro.value.correctAlternative = result.split(' ').join('').toLowerCase();
      debugger; 
    }
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
    debugger;
    let reader = e.target;
    this.formCadastro.value.imgUrl = reader.result;
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
      console.log(register);
      debugger;
      register.isActive = true;
      this.QuestionService.saveQuestion(register)
      .subscribe(
        data => {
          this.submitted = false;
          this.msg = true;
          this.router.navigate(['/questions']);
        },
        error => {
            console.log('Error', error);
        }
      );
    }
  }

}
