import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketComentarioPage } from './ticket-comentario.page';

const routes: Routes = [
  {
    path: '',
    component: TicketComentarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketComentarioPageRoutingModule {}
