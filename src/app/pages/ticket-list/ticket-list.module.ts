import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketListPageRoutingModule } from './ticket-list-routing.module';

import { TicketListPage } from './ticket-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketListPageRoutingModule
  ],
  declarations: [TicketListPage]
})
export class TicketListPageModule {}
