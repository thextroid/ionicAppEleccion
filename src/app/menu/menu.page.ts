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
    }

  ];
  selectPath='';
  user;
  cargo;
  constructor(private router:Router) {
    this.router.events.subscribe((event:RouterEvent)=>{
      if(event && event.url){
        this.selectPath=  event.url;
      }
    })
    this.user=JSON.parse(localStorage.getItem('sesion'));
   }

  ngOnInit() {
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login',{replaceUrl:true});
  }
}
