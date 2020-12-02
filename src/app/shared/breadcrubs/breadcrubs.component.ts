import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrubs',
  templateUrl: './breadcrubs.component.html',
  styles: [],
})
export class BreadcrubsComponent implements OnDestroy {
  titulo: string = 'titulo';
  public suscripcion$: Subscription;

  constructor(private router: Router) {
    this.suscripcion$ = this.getArgumentosRuta().subscribe((res) => {
      this.titulo = res;
      document.title = 'SEGASA - ' + res;
    });
  }
  ngOnDestroy(): void {
    this.suscripcion$.unsubscribe();
  }

  getArgumentosRuta() {
    return this.router.events.pipe(
      filter((event) => {
        return event instanceof ActivationEnd;
      }),
      filter((event: ActivationEnd) => {
        return event.snapshot.firstChild == null;
      }),
      map((result: ActivationEnd) => {
        return result.snapshot.data.titulo;
      })
    );
  }
}
