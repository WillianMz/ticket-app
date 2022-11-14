import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketListPage } from './ticket-list.page';

const routes: Routes = [
  {
    path: '',
    component: TicketListPage,
    data: {
      roles: ['Usuario','Suporte','Gerente','Admin']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketListPageRoutingModule {}
