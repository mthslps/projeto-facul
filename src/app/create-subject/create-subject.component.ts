import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { SubjectService } from '../services/subject.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent implements OnInit {

  constructor( private fb: FormBuilder, private router: Router, private SubjectService: SubjectService) { }

  submitted: boolean;
  public formCadastro;
  msg: boolean;

  ngOnInit() {
    this.createForm();

    this.msg = false;
  }
  createForm() {
    this.formCadastro = this.fb.group({
      name: new FormControl('', Validators.required),
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

      console.log(register);

      this.SubjectService.saveSubject(register)
      .subscribe(
        data => {
          this.submitted = false;
          this.msg = true;
          this.createForm();
          this.router.navigate(['/subjects']);
        },
        error => {
            console.log('Error', error);
        }
      );
    }
  }

}
