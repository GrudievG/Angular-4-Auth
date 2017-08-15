import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from '../../register.service';
import {ConfirmPasswordValidator} from '../../../_validators/confirm-password.validator';

@Component({
  moduleId: module.id,
  selector: 'second-step-register',
  templateUrl: 'second-step.component.html',
  styleUrls: ['second-step.component.scss']
})

export class SecondStepComponent implements OnInit {
  public registerForm: FormGroup;
  public showEmployedPlace: boolean = false;
  public options = {
    employment: [
      {key: '', value: ''},
      {key: 'employed', value: 'Employed'},
      {key: 'unemployed', value: 'Unemployed'},
      {key: 'student', value: 'Student'}
    ],
    annualIncome: [
      {key: '', value: ''},
      {key: 20, value: '$20k'},
      {key: 50, value: '$50k'},
      {key: 80, value: '$80k'},
      {key: 120, value: '$120k'},
      {key: 150, value: '$150k'}
    ]
  };
  public formErrors = {
    username: '',
    password: '',
    passwordConfirm: '',
    employment: '',
    employedPlace:'',
    termsAcceptance: ''
  };
  private validationMessages = {
    username: {
      required: 'Username is required',
      minlength: 'Username must be at least 2 characters long',
      maxlength: 'Username cannot be more than 15 characters long'
    },
    password: {
      required: 'Password is required',
      minlength: 'Password must be at least 6 characters long',
      pattern: 'Password needs to have at least one capital letter and number'
    },
    passwordConfirm: {
      required: 'Password confirmation  is required',
      match: 'Password not match'
    },
    employment: {
      required: 'This field is required'
    },
    employedPlace: {
      required: 'This field is required'
    }
  };

  constructor(private router: Router, private fb: FormBuilder, private registerService: RegisterService) {}

  public ngOnInit() {
    this.buildForm();
  }

  public submitForm() {
    console.log(this.registerForm.value);
  }

  public goToLogin () {
    this.router.navigate(['/login']);
  }

  private buildForm(): void {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
    this.registerForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(passwordRegex)
      ]],
      passwordConfirm: ['', [
        Validators.required
      ]],
      employment: ['',[
        Validators.required
      ]],
      employedPlace: [''],
      annualIncome: [''],
      favouriteSport: [''],
      termsAcceptance: ['']
    }, {
      validator: ConfirmPasswordValidator.matchPassword
    });

    this.registerForm.valueChanges
      .subscribe(data => {
        this.validateForm();
        if (this.registerForm.get('employment').value === 'employed' && !this.showEmployedPlace) {
          this.toggleEmployedPlace(true, [Validators.required]);
        }
        if (this.showEmployedPlace && this.registerForm.get('employment').value !== 'employed') {
          this.toggleEmployedPlace(false, null);
        }
      });
  }

  private validateForm() {
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const input = this.registerForm.get(field);
      if (input && input.dirty && input.invalid) {
        const messages = this.validationMessages[field];
        for (const error in input.errors) {
          this.formErrors[field] = messages[error];
        }
      }
    }
  }

  private toggleEmployedPlace (show, validators) {
    const field = this.registerForm.get('employedPlace');
    this.showEmployedPlace = show;
    if (!show) {
      field.reset();
    }
    field.setValidators(validators);
    field.updateValueAndValidity();
  }
}
