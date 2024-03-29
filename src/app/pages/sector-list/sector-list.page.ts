import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SetorResponse } from 'src/app/models/sector/setorResponse.model';
import { SectorService } from 'src/app/services/sector.service';

@Component({
  selector: 'app-sector-list',
  templateUrl: './sector-list.page.html',
  styleUrls: ['./sector-list.page.scss'],
})
export class SectorListPage implements OnInit {
  
  sectors: SetorResponse[];
  sectorName: string;

  constructor(
    private setorService: SectorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.listarSetores(true);
  }

  abrirChamado(setor: number) {
    this.router.navigate(['/ticket-open'], { queryParams: {setorId: setor}});
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
