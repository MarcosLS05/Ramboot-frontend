import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../service/usuario.service';
import { IUsuario } from '../../../model/usuario.interface';
import { ITipousuario } from '../../../model/tipousuario.interface';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { tipousuarioService } from '../../../service/tipousuario.service';
import { CryptoService } from '../../../service/crypto.service';
import { TipousuarioselectorComponent } from '../../tipousuario/tipousuarioselector/tipousuarioselector.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

declare let bootstrap: any;

@Component({
  selector: 'app-usuario-admin-edit-routed',
  templateUrl: './usuario.admin.edit.routed.component.html',
  styleUrls: ['./usuario.admin.edit.routed.component.css'],
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule],
})
export class UsuarioAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  oUsuarioForm: FormGroup | undefined = undefined;
  oUsuario: IUsuario | null = null;
  strMessage: string = '';
  myModal: any;
  readonly dialog = inject(MatDialog);
  oTipoUsuario: ITipousuario = {} as ITipousuario;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oUsuarioService: UsuarioService,
    private oRouter: Router,
    private oTipoUsuarioService: tipousuarioService,
    private oCryptoService: CryptoService
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.get();
    this.oUsuarioForm?.markAllAsTouched();

    // Suscripción a cambios en el campo 'tipousuario'
    this.oUsuarioForm?.controls['tipousuario'].valueChanges.subscribe(change => {
      if (change && change.id) {
        this.oTipoUsuarioService.get(change.id).subscribe({
          next: (oTipoUsuario: ITipousuario) => {
            this.oTipoUsuario = oTipoUsuario;
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.oTipoUsuario = {} as ITipousuario;
            this.oUsuarioForm?.controls['tipousuario'].setErrors({ invalid: true });
          }
        });
      } else {
        this.oTipoUsuario = {} as ITipousuario;
      }
    });
  }

  createForm() {
    this.oUsuarioForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      apellido1: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      apellido2: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
      tipousuario: new FormGroup({
        id: new FormControl('', Validators.required),
        titulo: new FormControl(''),
      }),
    });
  }

  updateForm() {
    if (this.oUsuario) {
      this.oUsuarioForm?.patchValue({
        id: this.oUsuario.id,
        nombre: this.oUsuario.nombre,
        apellido1: this.oUsuario.apellido1,
        apellido2: this.oUsuario.apellido2,
        email: this.oUsuario.email,
        tipousuario: {
          id: this.oUsuario.tipousuario?.id || '',
          titulo: this.oUsuario.tipousuario?.titulo || '',
        }
      });
    }
  }

  get() {
    this.oUsuarioService.get(this.id).subscribe({
      next: (oUsuario: IUsuario) => {
        this.oUsuario = oUsuario;
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
    this.oRouter.navigate(['/admin/usuario/plist/']);
  };

  onSubmit() {
    if (!this.oUsuarioForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    }

    let usuarioActualizado = { ...this.oUsuarioForm.value };

    // Encriptar la contraseña solo si el usuario la ha cambiado
    if (usuarioActualizado.password && usuarioActualizado.password.trim() !== '') {
      usuarioActualizado.password = this.oCryptoService.getHashSHA256(usuarioActualizado.password);
    } else {
      usuarioActualizado.password = this.oUsuario?.password; // Mantener la contraseña existente
    }

    this.oUsuarioService.update(usuarioActualizado).subscribe({
      next: (oUsuario: IUsuario) => {
        this.oUsuario = oUsuario;
        this.updateForm();
        this.showModal('Usuario ' + this.oUsuario.id + ' actualizado');
      },
      error: (error) => {
        this.showModal('Error al actualizar el usuario');
        console.error(error);
      },
    });
  }

  onReset() {
    this.oUsuarioService.get(this.id).subscribe({
      next: (oUsuario: IUsuario) => {
        this.oUsuario= oUsuario;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  showTipoUsuarioSelectorModal() {
    const dialogRef = this.dialog.open(TipousuarioselectorComponent, {
      height: '800px',
      maxHeight: '1200px',
      width: '80%',
      maxWidth: '90%',
      data: { origen: '', idBalance: '' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.oUsuarioForm?.controls['tipousuario'].setValue({
          id: result.id,
          titulo: result.titulo,
        });
      }
    });
    return false;
  }
}
