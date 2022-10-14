import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SetorResponse } from 'src/app/models/setorResponse.model';
import { SetorService } from 'src/app/services/setor.service';

@Component({
  selector: 'app-sector-list',
  templateUrl: './sector-list.page.html',
  styleUrls: ['./sector-list.page.scss'],
})
export class SectorListPage implements OnInit {
  
  sectors: SetorResponse[];
  sectorName: string;

  constructor(
    private setorService: SetorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.listarSetores(true);
  }

  public consultarEquipamentos(sectorId: string, ativo: boolean){
    this.router.navigate(['equipment'], {queryParams: { sector: sectorId, ativo: ativo}});
  }

  public procurarPorNome(){
    this.listByNome(this.sectorName);
  }

  private listarSetores(ativo: boolean) {
    this.setorService.getAll(ativo).subscribe({
      next: (response) => {
        this.sectors = response.map(item => {
          return {
            ...item,
            ativoString: item.ativo ? 'Ativo' : 'Inativo'
          }
        });
        
      },
      error: () => {
      }
    });
  }

  private listByNome(name: string) {
    this.setorService.getByNome(name).subscribe({
      next: (response) => {
        this.sectors = response;
      },
      error: () => {
      }
    });
  }

}
