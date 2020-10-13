import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  constructor(private $nav: NavController) { }

  ngOnInit() {}
  goLogin(){
    this.$nav.navigateForward('/login');
  }
}
