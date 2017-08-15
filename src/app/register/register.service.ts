import {Injectable} from '@angular/core';
import {User} from '../_models/user';

@Injectable()
export class RegisterService {
  private firstStepSubmitted: boolean = false;
  private firstStepUser = {};

  constructor() {}

  public registerFirstStep (user) {
    this.firstStepSubmitted = true;
    this.firstStepUser = user;
    console.log(this.firstStepUser);
  }

  public isSubmittedFirstStep () {
    return this.firstStepSubmitted;
  }
}
