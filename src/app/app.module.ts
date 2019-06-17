import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { Error404Component } from './error404/error404.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotifierModule } from 'angular-notifier';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CreateUserComponent } from './create-user/create-user.component';
import { SubjectComponent } from './subject/subject.component';
import { CreateSubjectComponent } from './create-subject/create-subject.component';
import { SchoolComponent } from './school/school.component';
import { QuestionComponent } from './question/question.component';
import { QuestionModalContent } from './question/question-modal.component';
import { EditQuestionModal } from './question/edit-question-modal.component';
import { CourseComponent } from './course/course.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { TestComponent } from './test/test.component';
import { CreateSchoolComponent } from './create-school/create-school.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FileSaverModule } from 'ngx-filesaver';
import { CreateTestComponent } from './create-test/create-test.component';

@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent,
    FooterComponent,
    HomeComponent,
    Error404Component,
    UserComponent,
    ContactComponent,
    CreateUserComponent,
    SubjectComponent,
    CreateSubjectComponent,
    EditQuestionModal,
    SchoolComponent,
    QuestionComponent,
    QuestionModalContent,
    CourseComponent,
    CreateQuestionComponent,
    CreateCourseComponent,
    TestComponent,
    CreateSchoolComponent,
    CreateTestComponent,
  ],
  entryComponents: [QuestionModalContent, EditQuestionModal],
  imports: [
    BrowserModule,
    NgxMaskModule.forRoot(),
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    AngularFontAwesomeModule,
    FormsModule,
    NotifierModule,
    FileUploadModule,
    NgSelectModule,
    FileSaverModule,
    BsDropdownModule.forRoot(),
   TooltipModule.forRoot(),
   ModalModule.forRoot()
  ],
  schemas: [ NgxSpinnerModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
