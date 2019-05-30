import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  
  courses: Course[];
  submitted: boolean;
  msg: boolean;

  constructor(private CourseService: CourseService) { }

  ngOnInit() {

    this.CourseService.getCourses().subscribe(dados => this.courses = dados);
  }

}
