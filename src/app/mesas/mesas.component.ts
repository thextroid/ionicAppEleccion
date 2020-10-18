import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonItemSliding, LoadingController } from '@ionic/angular';
import { RecintosService } from '../services/recintos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.scss'],
})
export class MesasComponent implements OnInit {
  datarec:any={};
  mesasUploads=[];
  constructor(
    private actroute:ActivatedRoute,
    private router:Router,
    private $rec:RecintosService,
    private _snackBar: MatSnackBar,
    private alert:AlertController,
    private load:LoadingController,
    private spinner: NgxSpinnerService
    ) {
    this.actroute.queryParams.subscribe(
      (params)=>{
        console.log(JSON.parse(params.especial));
        if(params && params.especial){
          this.datarec=JSON.parse(params.especial);
          this.setupMesas();
        }
      }
    );
   }

  ngOnInit() {
    // localStorage.removeItem('recinto');
    // localStorage.removeItem('mesa');
  }
  setupMesas(){
    this.$rec.getMesasCargadas(this.datarec._id).subscribe(
      (res)=>{
        console.log(res);
        if(res.length==0)return;
        for (let j = 0; j < this.datarec.mesas.length; j++) {
          for (let i = 0; i < res.length; i++) {
            let xmesa=res[i].numeroMesa;
            xmesa=parseInt(xmesa.substring(xmesa.indexOf(" ")+1,xmesa.length));
            if(xmesa==this.datarec.mesas[j].mesa){
              this.datarec.mesas[j].status=res[i].estado;
              break;
            }
          }
        }
      }
    )
  }
  async aperturar(idmesa,sliding?:IonItemSliding) {
        
        const alert = await this.alert.create({
          header: 'Aperturacion de Mesa',
          // subHeader: 'Delegado',
          message: "Escriba el nombre del delegado de mesa",
          inputs: [
            {
              name: 'delegado',
              type: 'text',
              placeholder: 'nombre'
            }
          ],
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (data:any) => {
                console.log('Confirm Cancel');
              }
            }, {
              text: 'Aperturar',
              handler: async (data:any) => {
                const renderdata=data.delegado.replace(/( )+/g,' ').trim();
                this.$rec.aperturarMesa(this.datarec._id,{
                  estado:"Aperturado",
                  delegado:(renderdata.length>0?"true":"false"),
                  mesa:idmesa
                }).subscribe(
                  (res)=>{
                    this.spinner.show();
                    for (let i = 0; i < this.datarec.mesas.length; i++) {
                      if(this.datarec.mesas[i].mesa==idmesa){
                        this.datarec.mesas[i].estado="Aperturado";
                        this.spinner.hide();
                        sliding.close();
                        break;
                      }
                    }
                  },
                  (error)=>{
                    console.log(error);
                  }
                )
                // console.log(data.delegado.replace(/( )+/g,' ').trim().length>0?"asignado":"no asignado");
              }
            }
          ]
        });
        await alert.present();
        
  }
  goVotacion(m){
    console.log(m);
    console.log(this.datarec);

    if(m.estado==="Aperturado" && !("status" in m) ){
      const nro=m.mesa;
      console.log(nro);
      const url=`/menu/recintos/mesas/${nro}/votaciones`;
      localStorage.setItem('recinto',JSON.stringify(this.datarec));
      localStorage.setItem('mesa',JSON.stringify(this.datarec.mesas.find( (item)=> item.mesa==1 )));
      this.router.navigateByUrl(url);
    }

    if(m.estado==="Sin Aperturar" )
      this.mensaje('Se debe aperturar para subir votacion','Mesa '+m.mesa);
      if(m.estado==="Aperturado" && m.status==="Enviado")
        this.mensaje('la mesa ya fue enviada su votacion','Mesa '+m.mesa);
      if(m.estado==="Aperturado" && m.status==="Verificado")
        this.mensaje('la mesa ya fue verificada su votacion','Mesa '+m.mesa);
      
  }
  mensaje(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
