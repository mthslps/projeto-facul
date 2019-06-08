import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { SchoolService } from '../services/school.service';
import { School } from '../model/school';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  constructor( private fb: FormBuilder, private router: Router, private SchoolService: SchoolService, private CourseService: CourseService) { }

  submitted: boolean;
  private formCadastro;
  msg: boolean;
  schoolList: School[];

  ngOnInit() {
    this.createForm();
    this.SchoolService.getSchools().subscribe(dados => this.schoolList = dados);
    this.msg = false;
  }
  createForm() {
    this.formCadastro = this.fb.group({
      name: new FormControl('', Validators.required),
      schoolId: new FormControl('')
    });
  }
  selectedSchool(data){
    if(data){
      this.formCadastro.value.schoolId = data.id
    }
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

      this.CourseService.saveCourse(register)
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