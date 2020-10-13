import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecintosRoutingModule } from './recintos-routing.module';
import { RecintosComponent } from './recintos.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatBadgeModule } from '@angular/material/badge';


@NgModule({
  declarations: [RecintosComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatBadgeModule,
    IonicModule,
    RecintosRoutingModule
  ]
})
export class RecintosModule { }
