import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { TestService } from '../services/test.service';
import { Subject } from '../model/subject';
import { Router } from "@angular/router";
import { SubjectService } from '../services/subject.service';
import { forEach } from '@angular/router/src/utils/collection';
import { QuestionService } from '../services/question.service';
import { TestObject } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {
  subjectList: Subject[];
  subjectQuestionArray: any[];
  public formCadastro;
  subjects: any[] = [];
  selectedObject = null;

  constructor(private fb: FormBuilder, private TestService: TestService, private router: Router, private SubjectService: SubjectService, private QuestionService: QuestionService) {
    this.SubjectService.getSubjects().subscribe(dados => {
      var subjectQuestionIds = new Array();
      this.subjectList = dados;
      this.subjectList.forEach(function (subject) {
        subjectQuestionIds.push(subject.id);
      })
      this.getSubjectId(subjectQuestionIds);
    })
    this.subjects.push({});
  }
  

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.formCadastro = this.fb.group({
      name: new FormControl(''),
      dueDate: new FormControl('')
    })
  }
  getSubjectId(e) {
    this.QuestionService.bySubjectId(e).subscribe(
      data => {
        this.subjectQuestionArray = data
        console.log(this.subjectQuestionArray);
      }
    );
  }

  selectedSubject(e, i){
    var selected = this.subjectList.find(item => item.name.trim() === e.target.value);
     
    var b = this.subjectQuestionArray.find(item => item.subjectId == selected.id);
    if(b.questionCount == 0){
      alert('Matéria não possui questões')
    }else{
    this.subjects[i] = ({subjectName: selected.name, subjectId: b.subjectId, questionsNumber: b.questionCount, maxQuestions: b.questionCount});
    if (this.subjects[i].maxQuestions == 1){
      this.subjects[i].questionsNumber = 1 
    };
    this.subjectList.forEach( (item, index) => {
      if(item === selected) this.subjectList.splice(index,1);
    });
    this.subjects.push({})
  }
  }

  selectedSubjectQuestionNumber(value, i){
    this.subjects[i].questionsNumber = value;
    console.log(this.subjects[i]);
     
  }

  onSubmit(){
    const test = this.formCadastro.value;
    const subjectsList = [];
    this.subjects.forEach(function (question){
      if(question.subjectId){
        subjectsList.push({subjectId: question.subjectId, questionsNumber: question.questionsNumber})
      }
    })  
    const data = ({test, subjectsList: subjectsList});
    this.TestService.createTest(data).subscribe(
      data => {
        this.router.navigate(['/tests'])
      },
      error => {
        console.log('Error', error);
      }
    )
  }
}
