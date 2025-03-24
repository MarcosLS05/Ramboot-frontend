import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ISnack } from '../../../model/snack.interface';
import { SnackService } from '../../../service/snack.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

declare let bootstrap: any;

@Component({
  selector: 'app-snack-admin-edit-routed',
  templateUrl: './snack.admin.edit.routed.component.html',
  styleUrls: ['./snack.admin.edit.routed.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
  ],
})
export class SnackAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  strMessage: string = '';
  oSnackForm: FormGroup | undefined = undefined;
  oSnack: ISnack | null = null;
  message: string = '';
  myModal: any;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oSnackService: SnackService,
    private oRouter: Router
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.get();
    this.oSnackForm?.markAllAsTouched();
  }

  createForm() {
    this.oSnackForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
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

  onReset() {
    this.oSnackService.get(this.id).subscribe({
      next: (oSnack: ISnack) => {
        this.oSnack = oSnack;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  updateForm() {
    this.oSnackForm?.controls['id'].setValue(this.oSnack?.id);
    this.oSnackForm?.controls['nombre'].setValue(this.oSnack?.nombre);
    this.oSnackForm?.controls['precio'].setValue(this.oSnack?.precio);
    this.oSnackForm?.controls['stock'].setValue(this.oSnack?.stock);
  }

  get() {
    this.oSnackService.get(this.id).subscribe({
      next: (oSnack: ISnack) => {
        this.oSnack = oSnack;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  showModal(mensaje: string) {
    this.message = mensaje;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/snack/view/' + this.oSnack?.id]);
  };

  onSubmit() {
    if (!this.oSnackForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oSnackService.update(this.oSnackForm?.value).subscribe({
        next: (oSnack: ISnack) => {
          this.oSnack = oSnack;
          this.updateForm();
          this.showModal('Producto ' + this.oSnack.id + ' actualizado');
        },
        error: (error) => {
          this.showModal('Error al actualizar el producto');
          console.error(error);
        },
      });
    }
  }
}
