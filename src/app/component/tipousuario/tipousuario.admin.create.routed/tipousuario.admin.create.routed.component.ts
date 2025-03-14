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
import { ITipousuario } from '../../../model/tipousuario.interface';
import { tipousuarioService } from '../../../service/tipousuario.service';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-tipousuario-admin-create-routed',
  templateUrl: './tipousuario.admin.create.routed.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  styleUrls: ['./tipousuario.admin.create.routed.component.css'],
})

export class TipousuarioAdminCreateRoutedComponent implements OnInit {
  id: number = 0;
  oTipousuarioForm: FormGroup | undefined = undefined;
  oTipousuario: ITipousuario | null = null;
  strMessage: string = '';
  

  myModal: any;

  constructor(private otipousuarioService: tipousuarioService, private oRouter: Router) {}

  ngOnInit() {
    this.createForm();
    this.oTipousuarioForm?.markAllAsTouched();
  }

  createForm() {
    this.oTipousuarioForm = new FormGroup({
      titulo: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),

      ]),
    });
  }

  updateForm() {
    this.oTipousuarioForm?.controls['titulo'].setValue('');

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
    this.oRouter.navigate(['/admin/tipousuario/view/' + this.oTipousuario?.id]);
  };

  onSubmit() {
    
    if (this.oTipousuarioForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {
      this.otipousuarioService.create(this.oTipousuarioForm?.value).subscribe({
        next: (oTipousuario: ITipousuario) => {
          this.oTipousuario = oTipousuario;
          this.showModal('Tipo usuario creado con el id: ' + this.oTipousuario.id);
        },
        error: (err) => {
          this.showModal('Error al crear el Tipousuario');
          console.log(err);
        },
      });
    }
  }
}
