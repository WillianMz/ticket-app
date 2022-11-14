import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketFormPageRoutingModule } from './ticket-form-routing.module';

import { TicketFormPage } from './ticket-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketFormPageRoutingModule
  ],
  declarations: [TicketFormPage]
})
export class TicketFormPageModule {}
