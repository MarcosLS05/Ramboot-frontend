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
import { ISnack } from '../../../model/snack.interface';
import { SnackService } from '../../../service/snack.service';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-snack-admin-create-routed',
  templateUrl: './snack.admin.create.routed.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  styleUrls: ['./snack.admin.create.routed.component.css'],
})
export class SnackAdminCreateRoutedComponent implements OnInit {
  id: number = 0;
  oSnackForm: FormGroup | undefined = undefined;
  oSnack: ISnack | null = null;
  strMessage: string = '';

  myModal: any;

  constructor(private oSnackService: SnackService, private oRouter: Router) {}

  ngOnInit() {
    this.createForm();
    this.oSnackForm?.markAllAsTouched();
  }

  createForm() {
    this.oSnackForm = new FormGroup({
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
    this.oSnackForm?.controls['nombre'].setValue('');
    this.oSnackForm?.controls['precio'].setValue('');
    this.oSnackForm?.controls['stock'].setValue('');
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
    this.oRouter.navigate(['/admin/snack/view/' + this.oSnack?.id]);
  };

  onSubmit() {
    if (this.oSnackForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {
      this.oSnackService.create(this.oSnackForm?.value).subscribe({
        next: (oSnack: ISnack) => {
          this.oSnack = oSnack;
          this.updateForm();
          this.showModal('Producto ' + this.oSnack.id + ' creado');
        },
        error: (err) => {
          this.showModal('Error al crear el producto');
          console.log(err);
        },
      });
    }
  }
}
