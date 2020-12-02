import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [],
})
export class PromesasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const promesa = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Respondiendo desde la promesa');
      }, 2000);
    });

    promesa
      .then((res) => {
        console.log('Respuesta exitosa');
        console.log(res);
      })
      .catch((err) => {
        console.log('Respuesta erronea');
        console.log(err);
      });

    console.log('Fin del init');

    this.getUsuarios().then((res) => {
      console.log(res);
    });
  }

  getUsuarios() {
    const promesa = new Promise((resolve) => {
      fetch('https://reqres.in/api/users?page=2').then((res) =>
        res.json().then((res) => {
          resolve(res.data);
        })
      );
    });
    return promesa;
  }
}
