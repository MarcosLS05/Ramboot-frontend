import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IZona } from '../../../model/zona.interface';
import { ZonaService } from '../../../service/zona.service';
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
  selector: 'app-zona-admin-edit-routed',
  templateUrl: './zona.admin.edit.routed.component.html',
  styleUrls: ['./zona.admin.edit.routed.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
  ],
})
export class ZonaAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  strMessage: string = '';
  oZonaForm: FormGroup | undefined = undefined;
  oZona: IZona | null = null;
  message: string = '';
  myModal: any;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oZonaService: ZonaService,
    private oRouter: Router
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.get();
    this.oZonaForm?.markAllAsTouched();
  }

  createForm() {
    this.oZonaForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      titulo: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
      precio: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
    });
  }

  onReset() {
    this.oZonaService.get(this.id).subscribe({
      next: (oZona: IZona) => {
        this.oZona = oZona;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  updateForm() {
    this.oZonaForm?.controls['id'].setValue(this.oZona?.id);
    this.oZonaForm?.controls['titulo'].setValue(this.oZona?.titulo);
    this.oZonaForm?.controls['precio'].setValue(this.oZona?.precio);
  }

  get() {
    this.oZonaService.get(this.id).subscribe({
      next: (oZona: IZona) => {
        this.oZona = oZona;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  showModal(strMessage: string) {
    this.strMessage = strMessage;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/zona/view/' + this.oZona?.id]);
  };

  onSubmit() {
    if (!this.oZonaForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oZonaService.update(this.oZonaForm?.value).subscribe({
        next: (oZona: IZona) => {
          this.oZona = oZona;
          this.updateForm();
          this.showModal('Zona ' + this.oZona.id + ' actualizada');
        },
        error: (error) => {
          this.showModal('Error al actualizar la zona');
          console.error(error);
        },
      });
    }
  }
}
