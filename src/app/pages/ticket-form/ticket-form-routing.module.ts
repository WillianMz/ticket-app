import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketFormPage } from './ticket-form.page';

const routes: Routes = [
  {
    path: '',
    component: TicketFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketFormPageRoutingModule {}
