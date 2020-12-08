import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(private http: HttpClient) {}
  get token() {
    return localStorage.getItem('token') || '';
  }

  get headerToken() {
    return { headers: { 'x-token': this.token } };
  }

  cargarHospitales() {
    return this.http.get(`${base_url}/hospitales`, this.headerToken).pipe(
      map((res: { ok: boolean; hospitales: Hospital[] }) => {
        return res.hospitales;
      })
    );
  }

  crearHospitales(hospital: Hospital) {
    return this.http.post(`${base_url}/hospitales`, hospital, this.headerToken);
  }

  actualizarHospitales(hospital: Hospital) {
    return this.http.put(
      `${base_url}/hospitales/${hospital._id}`,
      hospital,
      this.headerToken
    );
  }

  eliminarHospitale(hospital: Hospital) {
    return this.http.delete(
      `${base_url}/hospitales/${hospital._id}`,
      this.headerToken
    );
  }

  filtrarHospitales(filtro: string) {
    return this.http
      .get(`${base_url}/todo/coleccion/hospitales/${filtro}`, this.headerToken)
      .pipe(
        map((res: { ok: boolean; resultado: Hospital[] }) => {
          return res.resultado;
        })
      );
  }
}
