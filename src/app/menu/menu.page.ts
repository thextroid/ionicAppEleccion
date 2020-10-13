import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages=[
    {
      title:'Recintos',
      enlace:'/menu/recintos'
    },
    {
      title:'Mesas',
      enlace:'/menu/mesas'
    }

  ];
  selectPath='';
  constructor(private router:Router) {
    this.router.events.subscribe((event:RouterEvent)=>{
      if(event && event.url){
        this.selectPath=  event.url;
      }
    })
   }

  ngOnInit() {
  }

}
