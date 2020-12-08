import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicosService } from 'src/app/services/medicos.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  public medicoForm: FormGroup;
  public hospitales: Hospital[];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;
  constructor(
    private formBuider: FormBuilder,
    private _hospitalesService: HospitalService,
    private _medicoService: MedicosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarMedico(id);
    });
    this.medicoForm = this.formBuider.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      hospital: ['', [Validators.required]],
    });
    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges.subscribe((hospitalId) => {
      this.hospitalSeleccionado = this.hospitales.find((hos) => {
        return hos._id === hospitalId;
      });
    });
  }

  cargarMedico(id) {
    if (id !== 'nuevo') {
      this._medicoService.buscarMedicoPorId(id).subscribe(
        (res: any) => {
          this.medicoSeleccionado = res.medico;
          console.log(this.medicoSeleccionado);
          const { nombre, hospital } = res.medico;
          /*
        this.medicoForm.get('nombre').setValue(nombre);
        this.medicoForm.get('hospital').setValue(hospital._id);
        */
          this.medicoForm.setValue({ nombre, hospital: hospital._id });
        },
        (err) => {
          return this.router.navigateByUrl(`/dashboard/medicos`);
        }
      );
    }
  }

  guardarMedico() {
    if (this.medicoForm.invalid) {
      return;
    }
    const { nombre } = this.medicoForm.value;
    const { _id } = this.medicoSeleccionado;
    if (this.medicoSeleccionado) {
      this._medicoService
        .actualizarMedico(this.medicoForm.value, _id)
        .subscribe((res: any) => {
          Swal.fire(
            'Medico actualizado',
            `El medico ${nombre} fue actualizado con exito`,
            'success'
          );
        });
    } else {
      this._medicoService
        .crearMedico(this.medicoForm.value)
        .subscribe((res: any) => {
          Swal.fire(
            'Medico creado',
            `El medico ${nombre} fue guardado con exito`,
            'success'
          );
          this.router.navigateByUrl(`/dashboard/medico/${res.medico._id}`);
        });
    }
  }

  cargarHospitales() {
    this._hospitalesService.cargarHospitales().subscribe((res) => {
      this.hospitales = res;
    });
  }
}
