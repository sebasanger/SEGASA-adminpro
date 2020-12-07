import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css'],
})
export class ModalImagenComponent implements OnInit {
  public imagenSubir: File;
  public imgTemp: any = '';
  constructor(
    public _modalImagenService: ModalImagenService,
    private _uploadService: FileUploadService
  ) {}

  ngOnInit(): void {}

  cerrarModal() {
    this._modalImagenService.cerrarModal();
    this.imgTemp = null;
  }

  cambiarImagen(file: File) {
    if (!file) {
      this.imgTemp = null;
      return;
    }
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
    this.imagenSubir = file;
  }

  subirImagen() {
    const id = this._modalImagenService.id;
    const tipo = this._modalImagenService.tipo;
    this._uploadService
      .actualizarFoto(this.imagenSubir, tipo, id)
      .then((img) => {
        this.cerrarModal();
        this._modalImagenService.nuevaImagen.emit(img);
        Swal.fire(
          'Avatar cambiado',
          'LLa imagen se cambio con exito',
          'success'
        );
      })
      .catch((err) => {
        Swal.fire('Error', 'no se pudo subir la imagen', 'error');
      });
  }
}
