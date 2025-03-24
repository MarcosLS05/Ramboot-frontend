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
import { IBono } from '../../../model/bono.interface';
import { BonoService } from '../../../service/bono.service';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-bono-admin-create-routed',
  templateUrl: './bono.admin.create.routed.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  styleUrls: ['./bono.admin.create.routed.component.css'],
})
export class BonoAdminCreateRoutedComponent implements OnInit {
  id: number = 0;
  oBonoForm: FormGroup | undefined = undefined;
  oBono: IBono | null = null;
  strMessage: string = '';

  myModal: any;

  constructor(private oBonoService: BonoService, private oRouter: Router) {}

  ngOnInit() {
    this.createForm();
    this.oBonoForm?.markAllAsTouched();
  }

  createForm() {
    this.oBonoForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
      precio: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      stock: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
    });
  }

  updateForm() {
    this.oBonoForm?.controls['nombre'].setValue('');
    this.oBonoForm?.controls['precio'].setValue('');
    this.oBonoForm?.controls['stock'].setValue('');
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
    this.oRouter.navigate(['/admin/bono/view/' + this.oBono?.id]);
  };

  onSubmit() {
    if (this.oBonoForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {
      this.oBonoService.create(this.oBonoForm?.value).subscribe({
        next: (oBono: IBono) => {
          this.oBono = oBono;
          this.updateForm();
          this.showModal('Producto ' + this.oBono.id + ' creado');
        },
        error: (err) => {
          this.showModal('Error al crear el producto');
          console.log(err);
        },
      });
    }
  }
}
