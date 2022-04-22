import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SectorListPageRoutingModule } from './sector-list-routing.module';

import { SectorListPage } from './sector-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SectorListPageRoutingModule
  ],
  declarations: [SectorListPage]
})
export class SectorListPageModule {}
