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
import { IGcontrata } from '../../../model/gcontrata.interface';
import { GcontrataService } from '../../../service/gcontrata.service';
import { CommonModule } from '@angular/common';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-gcontrata-admin-create-routed',
  templateUrl: './gcontrata.admin.create.routed.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
  styleUrls: ['./gcontrata.admin.create.routed.component.css'],
})
export class GcontrataAdminCreateRoutedComponent implements OnInit {
  id: number = 0;
  oGcontrataForm: FormGroup | undefined = undefined;
  oGcontrata: IGcontrata | null = null;
  strMessage: string = '';
  TicketRandom: string = '';

  myModal: any;

  constructor(
    private oGcontrataService: GcontrataService,
    private oRouter: Router
  ) {}

  ngOnInit() {
    this.createForm();
    this.oGcontrataForm?.markAllAsTouched();
    this.generarTicket;
  }

  createForm() {
    this.oGcontrataForm = new FormGroup({
      fecha_creacion: new FormControl(new Date()),
      metodoPago: new FormControl(''),
      ticket: new FormControl(''),
      usuario: new FormGroup({
        id: new FormControl('', [Validators.required]),
        username: new FormControl(''),
        nombre: new FormControl(''),
        apellido1: new FormControl(''),
        apellido2: new FormControl(''),
        dni: new FormControl(''),
        cp: new FormControl(''),
        telefono: new FormControl(''),
        email: new FormControl(''),
        feedback: new FormControl(''),
        password: new FormControl(''),
        active: new FormControl(''),
        saldo: new FormControl(''),
        creadoEn: new FormControl(''),
        ultimoLoginEn: new FormControl(''),
      }),
      zona: new FormGroup({
        id: new FormControl('', [Validators.required]),
        titulo: new FormControl(''),
        precio: new FormControl(''),
      }),
    });
  }

  generarTicket() {
    this.oGcontrataService.getTicket().subscribe({
      next: (ticket) => {
        this.TicketRandom = ticket; // Asignas el ticket directamente
      },
      error: (err) => {
        console.error('Error al generar ticket:', err);
      },
    });
  }

  updateForm() {
    this.oGcontrataForm?.controls['fecha_creacion'].setValue(new Date());
    this.oGcontrataForm?.controls['metodoPago'].setValue('');
    this.oGcontrataForm?.controls['ticket'].setValue('');
    this.oGcontrataForm?.controls['usuario'].setValue({
      id: null,
      username: null,
      nombre: null,
      apellido1: null,
      apellido2: null,
      dni: null,
      cp: null,
      telefono: null,
      email: null,
      feedback: null,
      password: null,
      active: null,
      saldo: null,
      creadoEn: null,
      ultimoLoginEn: null,
    });
    this.oGcontrataForm?.controls['zona'].setValue({
      id: null,
      titulo: null,
      precio: null,
    });
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
    this.oRouter.navigate(['/admin/gcontrata/view/' + this.oGcontrata?.id]);
  };

  onSubmit() {
    if (this.oGcontrataForm?.invalid) {
      console.log(this.oGcontrataForm.errors);
      this.showModal('Formulario inválido');
      return;
    } else {
      this.oGcontrataService.create(this.oGcontrataForm?.value).subscribe({
        next: (oGcontrata: IGcontrata) => {
          this.oGcontrata = oGcontrata;
          this.updateForm();
          this.showModal('Producto ' + this.oGcontrata.id + ' creado');
        },
        error: (err) => {
          this.showModal('Error al crear el producto');
          console.log(err);
        },
      });
    }
  }
}
