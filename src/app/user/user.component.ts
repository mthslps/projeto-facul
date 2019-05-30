import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[];
  submitted: boolean;
  msg: boolean;
  countryForm: FormGroup;

  constructor(private fb: FormBuilder, private UserService: UserService) { }

  ngOnInit() {
    // this.state$ = this.stateService.getStates();
    // this.stateService.getStates().subscribe(dados => this.states = dados);
    // this.stateService.getCitiesAll().subscribe(dados => this.cities = dados);

    this.UserService.getUsers().subscribe(dados => this.users = dados);
    // this.typeArrival = 'city';
    // this.msg = false;
  }

  clean() {
  }

}
