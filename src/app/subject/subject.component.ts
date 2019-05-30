import { Component, OnInit } from '@angular/core';
import { Subject } from '../model/subject';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  subjects: Subject[];
  submitted: boolean;
  msg: boolean;

  constructor(private SubjectService: SubjectService) { }

  ngOnInit() {
    this.SubjectService.getSubjects().subscribe(dados => this.subjects = dados);
  }

}
