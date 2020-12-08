import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ModalImagenComponent } from 'src/app/components/modal-imagen/modal-imagen.component';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicosService } from 'src/app/services/medicos.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit, OnDestroy {
  constructor(
    private _medicosService: MedicosService,
    private _modalImagenService: ModalImagenService,
    private _busquedaService: BusquedasService
  ) {}

  public medicos: Medico[];
  private imgSusc: Subscription;
  public cargando: boolean = true;
  public medicosTemp: Medico[];

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSusc = this._modalImagenService.nuevaImagen
      .pipe(delay(200))
      .subscribe(() => {
        this.cargarMedicos();
      });
  }

  ngOnDestroy(): void {
    this.imgSusc.unsubscribe();
  }
  cargarMedicos() {
    this.cargando = true;
    this._medicosService.cargarMedicos().subscribe((res) => {
      this.medicos = res;
      this.medicosTemp = res;
      this.cargando = false;
    });
  }

  abrirModalImagen(medico: Medico) {
    this._modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  filtrarMedicos(filtro: string) {
    this._busquedaService.filtrar('medicos', filtro).subscribe((res: any) => {
      this.medicos = res;
    });
  }

  eliminarMedico(medico: Medico) {
    Swal.fire({
      title: 'Esta seguro que desea eliminar este medico?',
      text: 'Esta a punto de eliminar al medico ' + medico.nombre,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._medicosService.eliminarMedico(medico).subscribe((res: any) => {
          this.cargarMedicos();
          Swal.fire(
            'Medico eliminado',
            `El medico ${res.medico.nombre} fue eliminado`,
            'success'
          );
        });
      }
    });
  }
}
