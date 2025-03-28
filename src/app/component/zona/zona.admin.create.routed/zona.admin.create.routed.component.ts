import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IZona } from '../../../model/zona.interface';
import { ZonaService } from '../../../service/zona.service';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-zona-admin-create-routed',
  templateUrl: './zona.admin.create.routed.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  styleUrls: ['./zona.admin.create.routed.component.css'],
})
export class ZonaAdminCreateRoutedComponent implements OnInit {
  id: number = 0;
  oZonaForm: FormGroup | undefined = undefined;
  oZona: IZona | null = null;
  strMessage: string = '';

  myModal: any;

  constructor(private oZonaService: ZonaService, private oRouter: Router) {}

  ngOnInit() {
    this.createForm();
    this.oZonaForm?.markAllAsTouched();
  }

  createForm() {
    this.oZonaForm = new FormGroup({
      titulo: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),
      precio: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
    });
  }

  updateForm() {
    if (this.oZonaForm && this.oZonaForm.controls) {
      this.oZonaForm.controls['titulo'].setValue('');
      this.oZonaForm.controls['precio'].setValue('');
    } else {
      console.error('La forma no ha sido inicializada');
    }
  }

  showModal(mensaje: string) {
    this.strMessage = mensaje;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }

  onReset() {
    this.updateForm();
    return false;
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/zona/view/' + this.oZona?.id]);
  };

  onSubmit() {
    if (this.oZonaForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {
      this.oZonaService.create(this.oZonaForm?.value).subscribe({
        next: (oZona: IZona) => {
          this.oZona = oZona;
          this.updateForm();
          this.showModal('Producto ' + this.oZona.id + ' creado');
        },
        error: (err) => {
          this.showModal('Error al crear el producto');
          console.log(err);
        },
      });
    }
  }
}
