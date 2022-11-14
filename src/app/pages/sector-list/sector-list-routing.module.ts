import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SectorListPage } from './sector-list.page';

const routes: Routes = [
  {
    path: '',
    component: SectorListPage,
    data: {
      roles: ['Usuario','Suporte','Gerente','Admin']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SectorListPageRoutingModule {}
