import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-votaciones',
  templateUrl: './votaciones.page.html',
  styleUrls: ['./votaciones.page.scss'],
})
export class VotacionesPage implements OnInit {

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  ionicForm: FormGroup;
  defaultDate="06:00Z";
  isSubmitted = false;
  totalVotos:any=[];
  // pres=[];
  public recs: any[];
  public recsBackup: any[];
  
  constructor(private formBuilder: FormBuilder,
    public navCtrl: NavController,
     public alertCtrl: AlertController) { }
  datarec:any={};
  mesaSelect:any={};

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

  loadImageFromDevice(event) {

    const file = event.target.files[0];
  
    const reader = new FileReader();
  
    reader.readAsArrayBuffer(file);
  
    reader.onload = () => {
  
      let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
      // create blobURL, such that we could use it in an image element:
      let blobURL: string = URL.createObjectURL(blob);
      console.log(blob,blobURL);
  
    };
  
    reader.onerror = (error) => {
  
      //handle errors
  
    };
  };
  upload(){
    console.log(this.ionicForm.value);
    const data = {
      codMesa:this.ionicForm.controls['codMesa'],
      recinto:this.datarec._id,
      candidaturas:this.secondFormGroup.controls['candidatura']
    }
    console.log(data);
    // stepper.reset();
  }

}
