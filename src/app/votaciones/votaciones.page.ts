import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AlertController, NavController } from '@ionic/angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { UploaderOptions, UploadFile, UploadInput, UploadOutput, UploadStatus } from 'ngx-uploader';
import { VotacionService } from '../services/votacion.service';

@Component({
  selector: 'app-votaciones',
  templateUrl: './votaciones.page.html',
  styleUrls: ['./votaciones.page.scss'],
})
export class VotacionesPage implements OnInit {

  url = 'https://www.controlelectoralcctarija.com:/api/actas/image/';
	formData: FormData;
	files: UploadFile[];
	uploadInput: EventEmitter<UploadInput>;
	humanizeBytes: Function;
	dragOver: boolean;
	options: UploaderOptions;

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  ionicForm: FormGroup;
  defaultDate="06:00";
  isSubmitted = false;
  totalVotos:any=[];
  // pres=[];
  public recs: any[];
  public recsBackup: any[];
  
  constructor(private formBuilder: FormBuilder,
    public navCtrl: NavController,
    private $vot: VotacionService,
    private router:Router,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
     public alert: AlertController) {
       
      this.options = { concurrency: 1, maxUploads: 100, maxFileSize: (1<<23) };
		this.files = [];
		this.uploadInput = new EventEmitter<UploadInput>();
		this.humanizeBytes = this.humanizeBytes;
    }
  datarec:any={};
  mesaSelect:any={};
  imageChangedEvent: any = '';
  fileChangeEvent(event: any): void {
    this.finish=false;
    this.imageChangedEvent = event;
    console.log(event);
  }
  ngOnInit() {
    
    this.datarec=JSON.parse(localStorage.getItem("recinto"));
    this.mesaSelect=JSON.parse(localStorage.getItem("mesa"));
    console.log(this.datarec,this.mesaSelect);
    this.ionicForm = this.formBuilder.group({
      codMesa: ['', [Validators.required, Validators.minLength(4)]],
      horaApertura: [this.defaultDate],
      horaCierre: [this.defaultDate],
      empadronados: [this.mesaSelect.habilitados],
      estado: ['Enviado'],
      observaciones: ['']
    })
    this.firstFormGroup = this.formBuilder.group({
      codMesa: ['', Validators.required],
      observaciones: ['', Validators.required]
    });
        
    const group=[];
    group.push(this.createFormGroup("Presidente y Vicepresidente"));
    this.totalVotos.push(0);
    if(this.datarec.tipo.length==1)this.totalVotos.push(0);
    if(this.datarec.tipo.length==2){
      this.totalVotos.push(0);
      this.totalVotos.push(0);
    }
    if(this.datarec.tipo.length==2 || (this.datarec.tipo.length==1 && this.datarec.tipo[0]==="Uninominal"))
    group.push(this.createFormGroup("Diputados Uninominales"));
    
    if(this.datarec.tipo.length==2 || (this.datarec.tipo.length==1 && this.datarec.tipo[0]==="Especial"))
    group.push(this.createFormGroup("Diputados Especiales"));

    this.secondFormGroup = this.formBuilder.group({
      candidatura:this.formBuilder.array(group,[Validators.required,Validators.required,Validators.required])
    });
    console.log(this.secondFormGroup.get('candidatura'));
    
    // this.secondFormGroup.push(this.createPresidenteFormGroup());
    // this.secondFormGroup = this.formar
    // this.secondFormGroup.push(this.createPresidenteFormGroup());
  }
  createFormGroup(_candidatura){
    return this.formBuilder.group({
      CREEMOS:['',[Validators.required,Validators.max(220),Validators.maxLength(3)]],
      ADN:['',[Validators.required,Validators.max(220),Validators.maxLength(3)]],
      MASIPSP:['',[Validators.required,Validators.max(220),Validators.maxLength(3)]],
      FPV:['',[Validators.required,Validators.max(220),Validators.maxLength(3)]],
      PANBOL:['',[Validators.required,Validators.max(220),Validators.maxLength(3)]],
      LIBRE21:['',[Validators.required,Validators.max(220),Validators.maxLength(3)]],
      CC:['',[Validators.required,Validators.max(220),Validators.maxLength(3)]],
      JUNTOS:[0,[]],
      candidatura:[_candidatura,[]],
      votosValidos:[0,[]],
      votosBlancos:[0,[Validators.required,Validators.max(220),Validators.maxLength(3)]],
      votosNullos:[0,[Validators.required,Validators.max(220),Validators.maxLength(3)]]
    })
  }
  get errorControl() {
    return this.ionicForm.controls;
  }
  validar(){
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.ionicForm.value)
    }
  }
  isValidVotos=false
  validarVotos(){
    if(this.secondFormGroup.valid){
      this.isValidVotos=true;
      console.log(this.ionicForm.value);
      console.log(this.secondFormGroup.value,"es valido ");
    }
    else{
      console.log("no es valido");
    }
  }
  p(form){
    console.log(this.secondFormGroup.value);
  }

  counterValidos(idgroup){
    const diff=
    (this.secondFormGroup.value.candidatura[idgroup].CREEMOS?this.secondFormGroup.value.candidatura[idgroup].CREEMOS:0)+
    (this.secondFormGroup.value.candidatura[idgroup].ADN?this.secondFormGroup.value.candidatura[idgroup].ADN:0)+
    (this.secondFormGroup.value.candidatura[idgroup].MASIPSP?this.secondFormGroup.value.candidatura[idgroup].MASIPSP:0)+
    (this.secondFormGroup.value.candidatura[idgroup].FPV?this.secondFormGroup.value.candidatura[idgroup].FPV:0)+
    (this.secondFormGroup.value.candidatura[idgroup].PANBOL?this.secondFormGroup.value.candidatura[idgroup].PANBOL:0)+
    (this.secondFormGroup.value.candidatura[idgroup].LIBRE21?this.secondFormGroup.value.candidatura[idgroup].LIBRE21:0)+
    (this.secondFormGroup.value.candidatura[idgroup].CC?this.secondFormGroup.value.candidatura[idgroup].CC:0);
    console.log(this.secondFormGroup.controls['candidatura'].value);
    this.secondFormGroup.controls['candidatura'].get(''+idgroup).get('votosValidos').setValue(diff);
    this.totalVotos[idgroup]=diff+
    (this.secondFormGroup.value.candidatura[idgroup].votosBlancos?this.secondFormGroup.value.candidatura[idgroup].votosBlancos:0)+
    (this.secondFormGroup.value.candidatura[idgroup].votosNullos?this.secondFormGroup.value.candidatura[idgroup].votosNullos:0);
    return diff;
  }
  counterTotal(idgroup){
    console.log(this.secondFormGroup.value.candidatura[idgroup].votosNullos);
    console.log(this.secondFormGroup.value.candidatura[idgroup].votosBlancos);
    const diff =this.counterValidos(idgroup)+(this.secondFormGroup.value.candidatura[idgroup].votosNullos?this.secondFormGroup.value.candidatura[idgroup].votosNullos:0)+
    (this.secondFormGroup.value.candidatura[idgroup].votosBlancos?this.secondFormGroup.value.candidatura[idgroup].votosBlancos:0);
    return diff;
  }
  blob:any;
  finish=true;
  loadImageFromDevice(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      this.blob = file;
      // this.blob=reader;
      let blobURL: string = URL.createObjectURL(this.blob);
      this.finish=false;
      console.log(this.blob,blobURL);
    };
    reader.onerror = (error) => {
      console.log(error);
    };
  };
  stepper;
  acta:any;
  async upload(_stepper){
    this.stepper=_stepper;
    const alert = await this.alert.create({
      header: 'Cargado de la votacion',
      message: "Esta seguro de subir los datos del Acta?",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (data:any) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'SI',
          cssClass: 'primary',
          handler: async () => {
            console.log(this.ionicForm.value);
            this.spinner.show();
            const data = {
              codMesa:this.ionicForm.controls['codMesa'].value,
              numeroMesa:"Mesa "+this.mesaSelect.mesa,
              estado:"Enviado",
              recinto:this.datarec._id,
              candidaturas:this.secondFormGroup.controls['candidatura'].value
            }
            let _time= this.ionicForm.get('horaApertura').value.split(':');
            let _time2= this.ionicForm.get('horaCierre').value.split(':');
            let d=new Date();
            let d2=new Date();
            d.setHours(parseInt(_time[0]));
            d.setMinutes(parseInt(_time[1]));
            d2.setHours(parseInt(_time2[0]));
            d2.setMinutes(parseInt(_time2[1]));
            this.ionicForm.get('horaApertura').setValue(d);
            this.ionicForm.get('horaCierre').setValue(d);
            let form = new FormData();
            form.append("fotito",this.blob);
            form.append("nombre",'israel');
            console.log(this.ionicForm);
            console.log(this.blob);
            console.log(data);
            console.log(form);
            console.log(form.get('fotito'));
            this.$vot.uploadActa(this.ionicForm.value).subscribe(
              (response)=>{
                this.$vot.uploadVotos(data).subscribe(
                  (responseVoto)=>{
                    this.acta=response;
                    this.subir();
                  },
                  (errorVoto)=>{
                    console.log(errorVoto);
                  }
                )
              },
              (errorActa)=>{
                console.log(errorActa);
              }
            )

          }
        }
      ]
    });
    await alert.present();
  }
  
  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      const event: UploadInput = {
      type: 'uploadAll',
      url: this.url+this.mesaSelect,
      method: 'PUT',
      data: { }
      };
  
    //   this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      this.spinner.show('Guardando Foto');
      
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'cancelled' || output.type === 'removed') {
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } else if (output.type === 'rejected' && typeof output.file !== 'undefined') {
      this.mensaje('No se pudo cargar la imagen',"Foto de Acta");
      // this.$spinner.hide();
      console.log(output.file.name + ' rejected');
    }
    else if( output.type==='done'){
      this.stepper.reset();
      this.router.navigateByUrl('/menus/recintos?especial='+JSON.stringify(this.datarec),{replaceUrl:true});
      this.mensaje('Imagen de acta cargada correctamente!','Foto');
    }
  
    this.files = this.files.filter(file => file.progress.status !== UploadStatus.Done);
    }
  
    subir(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: this.url+this.acta.codMesa,
      method: 'PUT',
      data: { }
    };
  
    this.uploadInput.emit(event);
    }
  
    cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
    }
    cancelAllUpload(): void {
    this.uploadInput.emit({ type: 'cancelAll' });
    }
  
    removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
    }
  
    removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
    }
  
    mensaje(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 2000,
      });
    }
}
