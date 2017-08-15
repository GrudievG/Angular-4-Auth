import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterRoutingModule} from './register-routing.module';
import {FirstStepComponent} from './components/first-step/first-step.component';
import {SecondStepComponent} from './components/second-step/second-step.component';
import {RegisterService} from './register.service';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule
  ],
  providers: [RegisterService],
  declarations: [FirstStepComponent, SecondStepComponent],
})
export class RegisterModule {
}
