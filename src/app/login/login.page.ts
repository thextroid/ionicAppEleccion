import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials: FormGroup = new FormGroup({
    'usuario': new FormControl(),
  'password': new FormControl()
  });
  data={};
  constructor(
    private fb: FormBuilder,
    private authService: LoginService,
    private alertController: AlertController,
    private toast:ToastController,
    private router: Router,
    private spinner: NgxSpinnerService,
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
    this.spinner.show
    this.authService.login(this.credentials.value).subscribe(
      async (res)=>{
        console.log(res);
        
        this.router.navigateByUrl('/menu/recintos', { replaceUrl: true });
        this.authService.getUserToken().subscribe(
          (res2)=>{
            localStorage.setItem("sesion",JSON.stringify(res2));
            console.log(res2);
          },
          (error2)=>{
            console.log(error2);
          }
        )
        await loading.dismiss();
      },async (error)=>{
        await loading.dismiss();
        const toast = await this.toast.create({
          message: error.error,
          duration: 2000
        });
        toast.present();
        console.log(error);
      }
    )
    // if(this.credentials.value.usuario=="admin" && this.credentials.value.password==="123456"){
    //   await loading.dismiss();        
    //   this.router.navigateByUrl('/menu/recintos', { replaceUrl: true });
    // }
    // else{
    //   await loading.dismiss();
    //     const alert = await this.alertController.create({
    //       header: 'autentificación fallida',
    //       message: "De verifica los datos introducidos",
    //       buttons: ['OK'],
    //     });
 
    //     await alert.present();
    // }
  }
  

}
