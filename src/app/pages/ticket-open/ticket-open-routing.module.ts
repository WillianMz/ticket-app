import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketOpenPage } from './ticket-open.page';

const routes: Routes = [
  {
    path: '',
    component: TicketOpenPage,
    data: {
      roles: ['Usuario','Suporte','Gerente','Admin']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketOpenPageRoutingModule {}
