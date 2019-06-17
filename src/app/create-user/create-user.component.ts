import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor( private fb: FormBuilder,  private UserService: UserService) { }

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
      cpf: new FormControl('', [Validators.required, Validators.minLength(11),
        Validators.maxLength(11)]),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('123'),
      isAdmin: new FormControl(1)
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

      this.UserService.saveUser(register)
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
