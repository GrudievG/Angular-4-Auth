import {Component, OnChanges, OnInit} from '@angular/core';

import { User } from '../_models/user';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})

export class LoginComponent implements OnInit {
  user: User;

  ngOnInit() {
    this.user = {
      username: '',
      password: ''
    };
  }

  submitForm() {
    console.log(this.user);
  }
}
