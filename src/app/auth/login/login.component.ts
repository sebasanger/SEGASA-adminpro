import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private _usuarioService: UsuarioService
  ) {}

  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    remember: [false],
  });

  ngOnInit(): void {
    const correo = localStorage.getItem('email') || '';

    this.loginForm.get('email').setValue(correo);
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    const usuario = new Usuario(
      null,
      this.loginForm.get('email').value,
      this.loginForm.get('password').value
    );
    const remember = this.loginForm.get('remember').value;
    this._usuarioService.login(usuario, remember).subscribe(
      (res: any) => {
        Swal.fire('Bienvenido', res.usuario.nombre, 'success');
        this.router.navigateByUrl('/');
      },
      (err) => {
        Swal.fire('Error', err.error.mensaje, 'error');
      }
    );
  }
}
