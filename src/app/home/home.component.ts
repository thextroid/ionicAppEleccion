import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatStepper } from '@angular/material/stepper';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Events } from '../events';
import { IonSimpleWizard } from '../ion-simple-conditional-wizard/ion-simple-wizard.component';
import { LoginService } from '../services/login.service';
import { RecintosService } from '../services/recintos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  // slideOpts = {
  //   initialSlide: 1,
  //   speed: 400
  // };
  // isLinear = true;
  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;
  // public recs: any[];
  // public recsBackup: any[];

  constructor(private _formBuilder: FormBuilder,
    public navCtrl: NavController,
     public alertCtrl: AlertController,
     public loadingCtrl: LoadingController,
     public $rec: RecintosService,
     public $login: LoginService,
      public evts: Events) {
        
   
  }
  ngOnInit() {
    
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
  }
  
  logout(){

    this.$login.logout();
  }
}
