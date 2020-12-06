import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public uid?: string,
    public role?: string,
    public img?: string
  ) {}

  get getImagen() {
    if (this.img) {
      return `${base_url}/upload/usuarios/${this.img}`;
    } else {
      return `${base_url}/upload/usuarios/no-image`;
    }
  }
}
