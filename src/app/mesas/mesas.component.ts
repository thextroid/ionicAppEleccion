import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonItemSliding, LoadingController } from '@ionic/angular';
import { RecintosService } from '../services/recintos.service';
import { NgxSpinnerService } from 'ngx-spinner';

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

  ngOnInit() {}
  setupMesas(){
    this.$rec.getMesasCargadas(this.datarec._id).subscribe(
      (res)=>{
        console.log(res);
        if(res.length==0)return;
        for (let j = 0; j < this.datarec.mesas.length; j++) {
          for (let i = 0; i < res.length; i++) {
            const xmesa=parseInt(res[i].substring(res[i].indexOf(" ")+1,res[i].length));
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
                  delegado:(renderdata.length>0?renderdata:"false"),
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

                  }
                )
                
                
                console.log(data.delegado.replace(/( )+/g,' ').trim().length>0?"asignado":"no asignado");
              }
            }
          ]
        });
        await alert.present();
        
  }

}
