import { Component,inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CryptoService } from '../../../service/crypto.service';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  FormGroup,  
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUsuario } from '../../../model/usuario.interface';
import { UsuarioService } from '../../../service/usuario.service';
import { ITipousuario } from '../../../model/tipousuario.interface';
import { TipousuarioselectorComponent } from '../../tipousuario/tipousuarioselector/tipousuarioselector.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { tipousuarioService } from '../../../service/tipousuario.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-usuario.admin.create.routed',
  templateUrl: './usuario.admin.create.routed.component.html',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    MatIconModule,
    
  ],
  styleUrls: ['./usuario.admin.create.routed.component.css'],
})
export class UsuarioAdminCreateRoutedComponent implements OnInit {

  id: number = 0;
  oUsuarioForm: FormGroup | undefined = undefined;
  oUsuario: IUsuario | null = null;
  strMessage: string = '';
  readonly dialog = inject(MatDialog);
  oTipoUsuario: ITipousuario = {} as ITipousuario;
  myModal: any;

  form: FormGroup = new FormGroup({});
 

  constructor(
    private oUsuarioService: UsuarioService,
    private oRouter: Router,
    private oTipoUsuarioService: tipousuarioService,
    private oCryptoService: CryptoService
  
  ) {}

  
    ngOnInit() {
      this.createForm();
      if (this.oUsuarioForm) {
        this.oUsuarioForm.markAllAsTouched();
      
        // Suscripción a los cambios en el campo 'tipousuario'
        this.oUsuarioForm.controls['tipousuario'].valueChanges.subscribe(change => {
          if (change && change.id) {
            // Obtener el objeto tipousuario del servidor
            this.oTipoUsuarioService.get(change.id).subscribe({
              next: (oTipoUsuario: ITipousuario) => {
                this.oTipoUsuario = oTipoUsuario;
              },
              error: (err: HttpErrorResponse) => {  // Tipo de error especificado
                console.log(err);
                this.oTipoUsuario = {} as ITipousuario;
                // Marcar el campo como inválido si hay un error
                if (this.oUsuarioForm) {
                  this.oUsuarioForm.controls['tipousuario'].setErrors({
                    invalid: true,
                  });
                }
              }
            });
          } else {
            this.oTipoUsuario = {} as ITipousuario;
          }
        });
      }
    }
    
  createForm() {
    this.oUsuarioForm = new FormGroup({
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
        id: new FormControl('', Validators.required), // ID de tipocuenta
        titulo: new FormControl(''), // titulo de tipocuenta
      }),
    });
  }

  updateForm() {
    this.oUsuarioForm?.controls['nombre'].setValue('');
    this.oUsuarioForm?.controls['apellido1'].setValue('');
    this.oUsuarioForm?.controls['apellido2'].setValue('');
    this.oUsuarioForm?.controls['email'].setValue('');
    this.oUsuarioForm?.controls['password'].setValue('');
    this.oUsuarioForm?.controls['tipousuario'].setValue({
      id: null,
      titulo: null,
    });
   
  }

  showModal(mensaje: string) {
    this.strMessage = mensaje;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }

  isPasswordVisible = false;

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }



  onReset() {
    this.updateForm();
    return false;
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/usuario/view/' + this.oUsuario?.id]);
  }

  onSubmit() {
    if (this.oUsuarioForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {      
      const hashedPassword = this.oCryptoService.getHashSHA256(this.oUsuarioForm?.value.password);
      this.oUsuarioForm?.controls['password'].setValue(hashedPassword);
      this.oUsuarioService.create(this.oUsuarioForm?.value).subscribe({
        next: (oUsuario: IUsuario) => {
          this.oUsuario = oUsuario;
          this.showModal('Usuario creado con el id: ' + this.oUsuario.id);
        },
        error: (err) => {
          this.showModal('Error al crear el usuario');
          console.log(err);
        },
      });
    }
  }
  showTipoUsuarioSelectorModal() {
    const dialogRef = this.dialog.open(TipousuarioselectorComponent, {
      height: '500px',
      maxHeight: '500px',
      width: '50%',
      maxWidth: '90%',
      


    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
        this.oUsuarioForm?.controls['tipousuario'].setValue({
          id: result.id,
          titulo: result.titulo,
        });
      }
    });
    return false;
  }



}
