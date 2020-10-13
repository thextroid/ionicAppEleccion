import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecintosComponent } from './recintos.component';

const routes: Routes = [{
  path:'',
  component:RecintosComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecintosRoutingModule { }
