import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketAnexoPage } from './ticket-anexo.page';

const routes: Routes = [
  {
    path: '',
    component: TicketAnexoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketAnexoPageRoutingModule {}
