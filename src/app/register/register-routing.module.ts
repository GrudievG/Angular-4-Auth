import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FirstStepComponent} from './components/first-step/first-step.component';
import {SecondStepComponent} from './components/second-step/second-step.component';

const routes: Routes = [
  {path: 'step-1', component: FirstStepComponent},
  {path: 'step-2', component: SecondStepComponent},
  {path: '', redirectTo: 'step-1', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {
}
