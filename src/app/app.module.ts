import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

import { MatStepperModule } from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatBadgeModule} from '@angular/material/badge';

import { MatIconModule } from '@angular/material/icon';


import { LoginService } from './services/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { IonSimpleWizard } from './ion-simple-conditional-wizard/ion-simple-wizard.component';
import { IonSimpleWizardStep } from './ion-simple-conditional-wizard/ion-simple-wizard.step.component';
import { customTransition } from './shared';
import { RecintosService } from './services/recintos.service';
import { LoginPage } from './login/login.page';
import { IndexComponent } from './index/index.component';
import { MenuPage } from './menu/menu.page';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    MenuPage,
    IndexComponent,
    IonSimpleWizard,
    IonSimpleWizardStep
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatBadgeModule,
    MatSelectModule,
    MatStepperModule,
    BrowserAnimationsModule,
    IonicModule.forRoot({
      navAnimation:customTransition
    }),
    NgxSpinnerModule,
    AppRoutingModule,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginService,
    RecintosService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
