import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IGcontrata } from '../../../model/gcontrata.interface';
import { GcontrataService } from '../../../service/gcontrata.service';
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
  selector: 'app-gcontrata-admin-edit-routed',
  templateUrl: './gcontrata.admin.edit.routed.component.html',
  styleUrls: ['./gcontrata.admin.edit.routed.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
  ],
})
export class GcontrataAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  strMessage: string = '';
  oGcontrataForm: FormGroup | undefined = undefined;
  oGcontrata: IGcontrata | null = null;
  message: string = '';
  myModal: any;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oGcontrataService: GcontrataService,
    private oRouter: Router
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.get();
    this.oGcontrataForm?.markAllAsTouched();
  }

  createForm() {
    this.oGcontrataForm = new FormGroup({
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
    this.oGcontrataService.get(this.id).subscribe({
      next: (oGcontrata: IGcontrata) => {
        this.oGcontrata = oGcontrata;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  updateForm() {
    this.oGcontrataForm?.controls['id'].setValue(this.oGcontrata?.id);
    this.oGcontrataForm?.controls['metodoPago'].setValue(
      this.oGcontrata?.metodoPago
    );
    this.oGcontrataForm?.controls['ticket'].setValue(this.oGcontrata?.ticket);
  }

  get() {
    this.oGcontrataService.get(this.id).subscribe({
      next: (oGcontrata: IGcontrata) => {
        this.oGcontrata = oGcontrata;
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
    this.oRouter.navigate(['/admin/gcontrata/view/' + this.oGcontrata?.id]);
  };

  onSubmit() {
    if (!this.oGcontrataForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oGcontrataService.update(this.oGcontrataForm?.value).subscribe({
        next: (oGcontrata: IGcontrata) => {
          this.oGcontrata = oGcontrata;
          this.updateForm();
          this.showModal('Producto ' + this.oGcontrata.id + ' actualizado');
        },
        error: (error) => {
          this.showModal('Error al actualizar el producto');
          console.error(error);
        },
      });
    }
  }
}
