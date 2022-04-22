import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Meus Dados', url: '/ticket-list', icon: 'albums' },
    { title: 'Abrir Chamado', url: '/ticket-open', icon: 'add' },
    { title: 'Setores', url: '/sector-list', icon: 'layers' },
    { title: 'Meus Tickets', url: '/ticket-list', icon: 'ticket' },
    { title: 'Feedback', url: '/ticket-open', icon: 'newspaper' },
    { title: 'Sobre', url: '/about', icon: 'book' }
  ];

  constructor() {}
}
