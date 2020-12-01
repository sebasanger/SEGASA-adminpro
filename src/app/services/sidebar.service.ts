import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'Progress Bar', url: '/dashboard/progress' },
        { titulo: 'Grafica', url: '/dashboard/grafica1' },
      ],
    },
  ];

  constructor() {}
}
