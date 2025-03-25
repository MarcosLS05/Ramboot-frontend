import { Component, inject, OnInit } from '@angular/core';
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
import { ISnack } from '../../../model/snack.interface';
import { IBebida } from '../../../model/bebida.interface';
import { IZona } from '../../../model/zona.interface';
import { ZonaselectorComponent } from '../../zona/zonaselector/zonaselector.component';
import { BebidaselectorComponent } from '../../bebida/bebidaselector/bebidaselector.component';
import { SnackselectorComponent } from '../../snack/snackselector/snackselector.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

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
  oSnack: ISnack = {} as ISnack;
  oBebida: IBebida = {} as IBebida;
  oZona: IZona = {} as IZona;
  strMessage: string = '';
  myModal: any;
  readonly dialog = inject(MatDialog);
  form: FormGroup = new FormGroup({});

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
        Validators.maxLength(255),
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

  updateForm() {
    this.oBonoForm?.controls['nombre'].setValue('');
    this.oBonoForm?.controls['precio'].setValue('');
    this.oBonoForm?.controls['snack'].setValue({
      id: null,
      nombre: null,
      precio: null,
      stock: null,
    });
    this.oBonoForm?.controls['bebida'].setValue({
      id: null,
      nombre: null,
      precio: null,
      stock: null,
    });
    this.oBonoForm?.controls['zona'].setValue({
      id: null,
      titulo: null,
      precio: null,
    });
  }

  showSnackSelectorModal() {
    const dialogRef = this.dialog.open(SnackselectorComponent, {
      height: '500px',
      maxHeight: '500px',
      width: '50%',
      maxWidth: '90%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
        this.oBonoForm?.controls['snack'].setValue({
          id: result.id,
          nombre: result.nombre,
        });
      }
    });
    return false;
  }

  showBebidaSelectorModal() {
    const dialogRef = this.dialog.open(BebidaselectorComponent, {
      height: '500px',
      maxHeight: '500px',
      width: '50%',
      maxWidth: '90%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
        this.oBonoForm?.controls['bebida'].setValue({
          id: result.id,
          nombre: result.nombre,
          stock: result.stock,
          precio: result.precio,
        });
      }
    });
    return false;
  }

  showZonaSelectorModal() {
    const dialogRef = this.dialog.open(ZonaselectorComponent, {
      height: '500px',
      maxHeight: '500px',
      width: '50%',
      maxWidth: '90%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
        this.oBonoForm?.controls['snack'].setValue({
          id: result.id,
          nombre: result.nombre,
          stock: result.stock,
          precio: result.precio,
        });
      }
    });
    return false;
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
