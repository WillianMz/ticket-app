import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketOpenPage } from './ticket-open.page';

const routes: Routes = [
  {
    path: '',
    component: TicketOpenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketOpenPageRoutingModule {}
