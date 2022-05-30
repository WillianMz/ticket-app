import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketAnexoPageRoutingModule } from './ticket-anexo-routing.module';

import { TicketAnexoPage } from './ticket-anexo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketAnexoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TicketAnexoPage]
})
export class TicketAnexoPageModule {}
