import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { MesasModule } from '../mesas/mesas.module';
import { RecintosModule } from '../recintos/recintos.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // MesasModule,
    MenuPageRoutingModule
  ],
  declarations: []
})
export class MenuPageModule {}
