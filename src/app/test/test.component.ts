import { Component, OnInit } from '@angular/core';
import { Test } from '../model/test';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  tests: Test[];
  submitted: boolean;
  msg: boolean;

  constructor(private TestService: TestService) { }

  ngOnInit() {
    this.TestService.getTests().subscribe(dados => this.tests = dados);
  }

  generateTestLink(id){
    this.TestService.generateTest(id).subscribe(x => {
      var newBlob = new Blob([x], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
    }

    // For other browsers: 
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(newBlob);

    var link = document.createElement('a');
    link.href = data;
    link.download = `teste${id}.docx`;
    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

    setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
        link.remove();
    }, 100);
    });
  }

  generateTemplateLink(id){
    this.TestService.generateTemplate(id).subscribe(x => {
      var newBlob = new Blob([x], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
    }

    // For other browsers: 
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(newBlob);

    var link = document.createElement('a');
    link.href = data;
    link.download = `teste${id}-gabarito.docx`;
    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

    setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
        link.remove();
    }, 100);
    });
  }
}
