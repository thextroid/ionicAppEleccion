import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Events } from '../events';
import { LoginService } from '../services/login.service';
import { RecintosService } from '../services/recintos.service';

@Component({
  selector: 'app-recintos',
  templateUrl: './recintos.component.html',
  styleUrls: ['./recintos.component.scss'],
})
export class RecintosComponent implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public recs: any[];
  public recsBackup: any[];

  constructor(private _formBuilder: FormBuilder,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public $rec: RecintosService,
    public $login: LoginService,
    public evts: Events,
    private router:Router,
      ) {
        
   
  }
  ngOnInit() {
    this.loadRecintos();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  async presentLoading() {
    
  }
  async loadRecintos(evt?:any){
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Cargando Datos...',
      duration:2000
    });
    await loading.present();

     this.$rec.all().subscribe(
       (res)=>{
        this.recs=res;
        this.recsBackup=this.recs;
        if(evt)
        evt.target.complete();
        console.log(res);
      },
      (error)=>{
        console.log(error);
      }
      );
      await loading.onDidDismiss();
  }

  // next(matStepper :MatStepper){
  //   matStepper.next();
  // }
  doRefresh($event){
    this.loadRecintos($event);

  }
  async filtrar(evt) {
    this.recs = this.recsBackup;
    const searchTerm = evt.srcElement.value;
    console.log(searchTerm);
    if (!searchTerm) {
      return;
    }
  
    this.recs = this.recs.filter(currentFood => {
      if (currentFood.institucion && searchTerm) {
        return (currentFood.institucion.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }
  goMesas(Recinto_i){
    let params:NavigationExtras = {
      queryParams: {
        especial:JSON.stringify(Recinto_i)
      }
    }
    this.router.navigate(['/menu/recintos/mesas'],params);
  }
}
