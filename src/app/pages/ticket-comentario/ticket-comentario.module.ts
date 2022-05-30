import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketComentarioPageRoutingModule } from './ticket-comentario-routing.module';

import { TicketComentarioPage } from './ticket-comentario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketComentarioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TicketComentarioPage]
})
export class TicketComentarioPageModule {}
