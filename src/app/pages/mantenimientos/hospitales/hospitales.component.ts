import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription;
  constructor(
    private _hospitalService: HospitalService,
    private _modalImagenService: ModalImagenService
  ) {}
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this._modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => {
        this.cargarHospitales();
      });
  }
  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales().subscribe((res) => {
      this.hospitales = res;
      this.hospitalesTemp = res;
      this.cargando = false;
    });
  }

  guardarCambios(hospital: Hospital) {
    this._hospitalService.actualizarHospitales(hospital).subscribe((res) => {
      Swal.fire(
        'Actualizado',
        `El hospital ${hospital.nombre} fue actualizado`,
        'success'
      );
    });
  }

  eliminarHospital(hospital: Hospital) {
    this._hospitalService.eliminarHospitale(hospital).subscribe((res) => {
      Swal.fire(
        'Eliminado',
        `El hospital ${hospital.nombre} fue eliminado`,
        'success'
      );
      this.cargarHospitales();
    });
  }

  abrirModalImagen(hospital: Hospital) {
    this._modalImagenService.abrirModal(
      'hospitales',
      hospital._id,
      hospital.img
    );
  }

  fitrarHospitales(filtro: string) {
    if (filtro.length === 0) {
      this.hospitales = this.hospitalesTemp;
    } else {
      this._hospitalService.filtrarHospitales(filtro).subscribe((res) => {
        this.hospitales = res;
      });
    }
  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      input: 'text',
      inputLabel: 'Nombre del hospital',
      showCancelButton: true,
    });

    if (value.length > 2) {
      const hospital = new Hospital(value);
      this._hospitalService.crearHospitales(hospital).subscribe((res: any) => {
        this.hospitales.push(res.hospital);
        Swal.fire(
          'Hospital guardado',
          `El hospital: ${res.hospital.nombre} fue creado con exito`,
          'success'
        );
      });
    }
  }
}
