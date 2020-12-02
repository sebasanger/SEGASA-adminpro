import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, pipe, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {
  intervaloSusc: Subscription;
  constructor() {
    // this.oyente();
    this.oyenteIntervalo();
  }
  ngOnDestroy(): void {
    this.intervaloSusc.unsubscribe();
  }
  oyenteIntervalo() {
    this.intervaloSusc = this.retornaIntervalo().subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.error('hubo un error en el intervalo');
      },
      () => {
        console.log('Finalizo el intevalo');
      }
    );
  }

  //observable de intervalo de rxjs
  retornaIntervalo() {
    const interval$ = interval(100).pipe(
      take(100),
      map((valor) => {
        return valor + 1;
      }),
      filter((valor) => {
        return valor % 2 == 0;
      })
    );
    return interval$;
  }

  //observable
  retornaObservable(): Observable<number> {
    const obs$ = new Observable<number>((observer) => {
      let i = -1;
      const intervalo = setInterval(() => {
        observer.next(++i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
          console.log('Observador termiando');
        }

        if (i === 2) {
          clearInterval(intervalo);
          observer.error();
          console.log('Observador con error');
        }
      }, 1000);
    });
    return obs$;
  }

  //oyente
  oyente() {
    this.retornaObservable()
      .pipe(retry(2))
      .subscribe(
        (valor) => {
          console.log(valor);
        },
        (err) => {
          console.error('me avisaron que el observador tuvo un error');
        },
        () => {
          console.info('me avisaron que el observador termino');
        }
      );
  }
}
