import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketOpenPageRoutingModule } from './ticket-open-routing.module';

import { TicketOpenPage } from './ticket-open.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketOpenPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [TicketOpenPage]
})
export class TicketOpenPageModule {}
