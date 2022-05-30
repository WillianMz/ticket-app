import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-anexo',
  templateUrl: './ticket-anexo.page.html',
  styleUrls: ['./ticket-anexo.page.scss'],
})
export class TicketAnexoPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  save(){
    this.router.navigate(['/ticket-comentario']);
  }

}
