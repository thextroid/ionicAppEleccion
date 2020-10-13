import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credentials: FormGroup = new FormGroup({
    'usuario': new FormControl(),
  'password': new FormControl()
  });
  data={};
  constructor(
    private fb: FormBuilder,
    private authService: LoginService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ) {}
 
  ngOnInit() {
    this.credentials = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
 
  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    
    if(this.credentials.value.usuario=="admin" && this.credentials.value.password==="123456"){
      await loading.dismiss();        
      this.router.navigateByUrl('/home', { replaceUrl: true });
    }
    else{
      await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'autentificación fallida',
          message: "De verifica los datos introducidos",
          buttons: ['OK'],
        });
 
        await alert.present();
    }
    // this.authService.login(this.credentials.value).subscribe(
    //   async (res) => {
    //     await loading.dismiss();        
    //     this.router.navigateByUrl('/home', { replaceUrl: true });
    //   },
    //   async (res) => {
    //     await loading.dismiss();
    //     const alert = await this.alertController.create({
    //       header: 'autentificación fallida',
    //       message: res.error.error,
    //       buttons: ['OK'],
    //     });
 
    //     await alert.present();
    //   }
    // );
  }
}
