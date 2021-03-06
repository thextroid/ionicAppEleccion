import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children :[
      {
        path:'recintos',
        loadChildren: () =>
          import("../recintos/recintos.module").then((m) => m.RecintosModule)
      },
      {
        path:'recintos/mesas',
        loadChildren: () =>
          import("../mesas/mesas.module").then((m) => m.MesasModule)
      },
      {
        path:'recintos/mesas/:id/votaciones',
        loadChildren: () =>
          import("../votaciones/votaciones.module").then((m) => m.VotacionesPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
