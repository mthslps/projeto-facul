import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { SchoolService } from '../services/school.service';

@Component({
  selector: 'app-create-school',
  templateUrl: './create-school.component.html',
  styleUrls: ['./create-school.component.css']
})
export class CreateSchoolComponent implements OnInit {

  constructor( private fb: FormBuilder,  private SchoolService: SchoolService) { }

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

      this.SchoolService.saveSchool(register)
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
