import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public formSubmitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private _usuarioService: UsuarioService,
    private router: Router
  ) {}

  public registerForm = this.formBuilder.group(
    {
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      password2: ['', [Validators.required, Validators.minLength(3)]],
      terminos: [false, [Validators.requiredTrue]],
    },
    { validators: this.passwordIguales('password', 'password2') }
  );

  ngOnInit(): void {}

  crearUsuario() {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this._usuarioService.crearUsuario(this.registerForm.value).subscribe(
      (res: any) => {
        Swal.fire('Bienvenido', res.usuario.nombre, 'success');
        this.router.navigateByUrl('/login');
      },
      (err) => {
        Swal.fire('Error', err.error.mensaje, 'error');
      }
    );
  }

  campoInvalido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordInvalid(): boolean {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordIguales(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);
      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }
}
