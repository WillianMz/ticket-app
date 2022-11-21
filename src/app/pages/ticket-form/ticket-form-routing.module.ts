import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketFormPage } from './ticket-form.page';

const routes: Routes = [
  {
    path: '',
    component: TicketFormPage
  },
  {
    path:':id',
    component: TicketFormPage,
    data: {
      roles: ['Suporte','Gerente','Admin']
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketFormPageRoutingModule {}
