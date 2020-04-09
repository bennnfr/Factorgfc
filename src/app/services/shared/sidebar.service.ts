import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Usuarios',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Crear Usuario', url: '/crearusuario' },
        { titulo : 'Ver Usuarios', url: '/verusuarios' },
        { titulo: 'Gráficas', url: '/graficas1' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'RxJs', url: '/rxjs' }
      ]
    }
  ];

  menu2: any = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      url: '/dashboard'
    },
    {
      titulo: 'Progresbar',
      icono: 'mdi mdi-gauge',
      url: '/progress'
    }
  ];

  constructor() { }

}
