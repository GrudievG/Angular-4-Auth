import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {Router} from '@angular/router';
import {ageControlValidator} from '../../../_validators/age.validator';
import {RegisterService} from '../../register.service';
import {User} from '../../../_models/user';

@Component({
  moduleId: module.id,
  selector: 'first-step-register',
  templateUrl: 'first-step.component.html',
  styleUrls: ['first-step.component.scss']
})

export class FirstStepComponent implements OnInit {
  public registerForm: FormGroup;
  public formErrors = {
    name: '',
    surname: '',
    dateOfBirth: '',
    phone: '',
    addresses: [{
      country: '',
      city: '',
      street: ''
    }]
  };
  private user: User = {
    name: '',
    surname: '',
    dateOfBirth: '',
    phone: '',
    addresses: [{
      country: '',
      city: '',
      street: '',
    }]
  };
  private validationMessages = {
    name: {
      required: 'Name is required',
      minlength: 'Name must be at least 2 characters long',
      maxlength: 'Name cannot be more than 15 characters long'
    },
    surname: {
      required: 'Surname is required',
      minlength: 'Name must be at least 2 characters long',
      maxlength: 'Name cannot be more than 20 characters long'
    },
    dateOfBirth: {
      required: 'Date of birth is required',
      pattern: 'Date of birth must be in format dd/mm/yyyy',
      ageInvalid: 'You must be over 18 years of age'
    },
    phone: {
      required: 'Phone number is required'
    },
    addresses: {
      country: {
        required: 'Country is required'
      },
      city: {
        required: 'City is required'
      },
      street: {
        required: 'Street is required'
      }
    }
  };

  constructor(private router: Router, private fb: FormBuilder, private registerService: RegisterService) {}

  public ngOnInit() {
    this.buildForm();
  }

  public addAddress() {
    let addresses = <FormArray>this.registerForm.get('addresses');
    addresses.push(this.createAddress());
  }

  public removeAddress (index) {
    let addresses = <FormArray>this.registerForm.get('addresses');
    addresses.removeAt(index);
  }

  public submitForm () {
    this.user = this.registerForm.value;
    this.registerService.registerFirstStep(this.user);
    this.router.navigate(['/register/step-2']);
  }

  public goToLogin () {
    this.router.navigate(['/login']);
  }

  private buildForm(): void {
    const birthdayRegex = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/;
    this.registerForm = this.fb.group({
      name: [this.user.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15)
      ]],
      surname: [this.user.surname, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]],
      dateOfBirth: [this.user.dateOfBirth, [
        Validators.required,
        Validators.pattern(birthdayRegex),
        ageControlValidator
      ]],
      phone: [this.user.phone, [Validators.required]],
      addresses: this.fb.array([this.createAddress()])
    });

    this.registerForm.valueChanges
      .subscribe(data => {
        this.validateForm();
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
    this.validateAddresses();
  }

  private validateAddresses() {
    const addresses = <FormArray>this.registerForm.get('addresses');
    this.formErrors.addresses = [];
    let n = 1;
    while (n <= addresses.length) {
      this.formErrors.addresses.push({
        country: '',
        city: '',
        street: ''
      });
      const address = <FormGroup>addresses.at(n - 1);
      for (const field in address.controls) {
        const input = address.get(field);
        if (input && input.dirty && input.invalid) {
          const messages = this.validationMessages.addresses[field];
          for (const error in input.errors) {
            this.formErrors.addresses[n-1][field] = messages[error];
          }
        }
      }
      n++;
    }
  }

  private createAddress() {
    return this.fb.group({
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      street: ['']
    })
  }
}

