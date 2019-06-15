import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { QuestionComponent } from './question/question.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ContactComponent } from './contact/contact.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { SubjectComponent } from './subject/subject.component';
import { CreateSubjectComponent } from './create-subject/create-subject.component';
import { SchoolComponent } from './school/school.component';
import { CreateSchoolComponent } from './create-school/create-school.component';
import { CourseComponent } from './course/course.component';
import { TestComponent } from './test/test.component';
import { CreateCourseComponent } from './create-course/create-course.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/questions', pathMatch: 'full' },
  { path: 'users', component: UserComponent},
  { path: 'create-user', component: CreateUserComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'subjects', component: SubjectComponent },
  { path: 'courses' , component: CourseComponent },
  { path: 'questions', component: QuestionComponent },
  { path: 'create-course', component: CreateCourseComponent},
  { path: 'create-subject', component: CreateSubjectComponent },
  { path: 'create-question', component: CreateQuestionComponent },
  { path: 'schools', component: SchoolComponent },
  { path: 'tests', component: TestComponent },
  { path: 'create-school', component: CreateSchoolComponent },
  { path: '**', component: Error404Component },
  { path: '**', component: Error404Component },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}) ]
})
export class AppRoutingModule { }
