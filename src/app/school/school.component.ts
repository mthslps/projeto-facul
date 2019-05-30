import { Component, OnInit } from '@angular/core';
import { School } from '../model/school';
import { SchoolService } from '../services/school.service';


@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {

  schools: School[];
  submitted: boolean;
  msg: boolean;
  
  constructor(private SchoolService: SchoolService) { }
  
  ngOnInit() {
     this.SchoolService.getSchools().subscribe(dados => this.schools = dados);
  }

}
