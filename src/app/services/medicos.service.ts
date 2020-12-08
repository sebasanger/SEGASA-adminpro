import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class MedicosService {
  constructor(private http: HttpClient) {}
  get token() {
    return localStorage.getItem('token') || '';
  }

  get headerToken() {
    return { headers: { 'x-token': this.token } };
  }

  cargarMedicos() {
    return this.http.get(`${base_url}/medicos`, this.headerToken).pipe(
      map((res: { ok: boolean; medicos: Medico[] }) => {
        return res.medicos;
      })
    );
  }

  crearMedico(medico: { nombre: string; hospital: string }) {
    return this.http.post(`${base_url}/medicos`, medico, this.headerToken);
  }

  eliminarMedico(medico: Medico) {
    return this.http.delete(
      `${base_url}/medicos/${medico._id}`,
      this.headerToken
    );
  }

  actualizarMedico(medico: Medico, id: string) {
    return this.http.put(`${base_url}/medicos/${id}`, medico, this.headerToken);
  }

  buscarMedicoPorId(id: string) {
    return this.http.get(`${base_url}/medicos/${id}`, this.headerToken);
  }
}
