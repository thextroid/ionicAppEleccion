import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatBadgeModule} from '@angular/material/badge';

import { MatIconModule } from '@angular/material/icon';

import { IonicModule } from '@ionic/angular';
import { NgxUploaderModule } from 'ngx-uploader';
import { VotacionesPageRoutingModule } from './votaciones-routing.module';

import { VotacionesPage } from './votaciones.page';
import { VotacionService } from '../services/votacion.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    NgxUploaderModule,
    FormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatBadgeModule,
    MatSelectModule,
    MatStepperModule,
    NgxSpinnerModule,
    VotacionesPageRoutingModule
  ],
  declarations: [VotacionesPage],
  providers:[
    NgxSpinnerService,
    VotacionService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VotacionesPageModule {}
