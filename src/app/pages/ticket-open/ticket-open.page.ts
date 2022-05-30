import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-open',
  templateUrl: './ticket-open.page.html',
  styleUrls: ['./ticket-open.page.scss'],
})
export class TicketOpenPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  save(){
    this.router.navigate(['/ticket-anexo']);
  }

}
