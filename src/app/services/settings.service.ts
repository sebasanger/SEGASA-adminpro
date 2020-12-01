import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private linkTema = document.getElementById('theme');
  constructor() {
    const tema = localStorage.getItem('theme') || 'red-dark';
    const url = `./assets/css/colors/${tema}.css`;
    this.linkTema.setAttribute('href', url);
  }

  changeTheme(tema: string) {
    const url = `./assets/css/colors/${tema}.css`;
    this.linkTema.setAttribute('href', url);
    localStorage.setItem('theme', tema);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const selectores: NodeListOf<Element> = document.querySelectorAll(
      '.selector'
    );
    selectores.forEach((element) => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTema.getAttribute('href');
      if (btnThemeUrl == currentTheme) {
        element.classList.add('working');
      }
    });
  }
}
