import { Component, OnInit } from '@angular/core';
import TestFormModel from './form/TestFormModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngx-quickform';

  model = new TestFormModel();

  ngOnInit() {
  }

  onSubmit(data: any) {
    console.log(data);
  }
}
