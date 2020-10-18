import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MesasRoutingModule } from './mesas-routing.module';
import { MesasComponent } from './mesas.component';
import { IonicModule } from '@ionic/angular';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [MesasComponent],
  imports: [
    CommonModule,
    IonicModule,
    MatSnackBarModule,
    NgxSpinnerModule,
    MesasRoutingModule
  ],
  providers:[
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MesasModule { }
