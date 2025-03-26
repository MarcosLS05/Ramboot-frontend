import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IBono } from '../../../model/bono.interface';
import { BonoService } from '../../../service/bono.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { SnackselectorComponent } from '../../snack/snackselector/snackselector.component';
import { MatDialog } from '@angular/material/dialog';
import { BebidaselectorComponent } from '../../bebida/bebidaselector/bebidaselector.component';

declare let bootstrap: any;

@Component({
  selector: 'app-bono-admin-edit-routed',
  templateUrl: './bono.admin.edit.routed.component.html',
  styleUrls: ['./bono.admin.edit.routed.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
  ],
})
export class BonoAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  strMessage: string = '';
  oBonoForm: FormGroup | undefined = undefined;
  oBono: IBono | null = null;
  readonly dialog = inject(MatDialog);
  message: string = '';
  myModal: any;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oBonoService: BonoService,
    private oRouter: Router
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.get();
    this.oBonoForm?.markAllAsTouched();
  }

  createForm() {
    this.oBonoForm = new FormGroup({
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
      snack: new FormGroup({
        id: new FormControl('', [Validators.required]),
        nombre: new FormControl(''),
        precio: new FormControl(''),
        stock: new FormControl(''),
      }),
      bebida: new FormGroup({
        id: new FormControl('', [Validators.required]),
        nombre: new FormControl(''),
        precio: new FormControl(''),
        stock: new FormControl(''),
      }),
      zona: new FormGroup({
        id: new FormControl('', [Validators.required]),
        titulo: new FormControl(''),
        precio: new FormControl(''),
      }),
    });
  }

  onReset() {
    this.oBonoService.get(this.id).subscribe({
      next: (oBono: IBono) => {
        this.oBono = oBono;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  updateForm() {
    if (this.oBono) {
      this.oBonoForm?.patchValue({
        id: this.oBono.id,
        nombre: this.oBono.nombre,
        precio: this.oBono.precio,
        snack: {
          id: this.oBono.snack?.id || '',
          nombre: this.oBono.snack?.nombre || '',
          precio: this.oBono.snack?.precio || '',
          stock: this.oBono.snack?.stock || '',
        },
        bebida: {
          id: this.oBono.bebida?.id || '',
          nombre: this.oBono.bebida?.nombre || '',
          precio: this.oBono.bebida?.precio || '',
          stock: this.oBono.bebida?.stock || '',
        },
        zona: {
          id: this.oBono.zona?.id || '',
          titulo: this.oBono.zona?.titulo || '',
          precio: this.oBono.zona?.precio || '',
        },
      });
    }
  }

  showZonaSelectorModal() {
    const dialogRef = this.dialog.open(SnackselectorComponent, {
      height: '800px',
      maxHeight: '1200px',
      width: '80%',
      maxWidth: '90%',
      data: { origen: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.oBonoForm?.controls['zona'].setValue({
          id: result.id,
          titulo: result.titulo,
        });
      }
    });
    return false;
  }

  showBebidaSelectorModal() {
    const dialogRef = this.dialog.open(BebidaselectorComponent, {
      height: '800px',
      maxHeight: '1200px',
      width: '80%',
      maxWidth: '90%',
      data: { origen: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.oBonoForm?.controls['bebida'].setValue({
          id: result.id,
          nombre: result.nombre,
        });
      }
    });
    return false;
  }

  showSnackSelectorModal() {
    const dialogRef = this.dialog.open(SnackselectorComponent, {
      height: '800px',
      maxHeight: '1200px',
      width: '80%',
      maxWidth: '90%',
      data: { origen: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.oBonoForm?.controls['snack'].setValue({
          id: result.id,
          nombre: result.nombre,
        });
      }
    });
    return false;
  }

  get() {
    this.oBonoService.get(this.id).subscribe({
      next: (oBono: IBono) => {
        this.oBono = oBono;
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
    this.oRouter.navigate(['/admin/bono/view/' + this.oBono?.id]);
  };

  onSubmit() {
    if (!this.oBonoForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oBonoService.update(this.oBonoForm?.value).subscribe({
        next: (oBono: IBono) => {
          this.oBono = oBono;
          this.updateForm();
          this.showModal('Producto ' + this.oBono.id + ' actualizado');
        },
        error: (error) => {
          this.showModal('Error al actualizar el producto');
          console.error(error);
        },
      });
    }
  }
}
