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

}
