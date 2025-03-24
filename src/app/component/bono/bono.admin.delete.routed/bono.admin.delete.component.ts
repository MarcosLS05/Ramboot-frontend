import { Component, OnInit } from '@angular/core';
import { BonoService } from '../../../service/bono.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IBono } from '../../../model/bono.interface';

declare let bootstrap: any;

@Component({
  selector: 'app-bono-admin-delete-routed',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './bono.admin.delete.component.html',
  styleUrl: './bono.admin.delete.component.css',
})
export class BonoAdminDeleteRoutedComponent implements OnInit {
  oBono: IBono | null = null;
  strMessage: string = '';
  myModal: any;

  constructor(
    private oBonoService: BonoService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
  ) {}

  ngOnInit(): void {
    let id = this.oActivatedRoute.snapshot.params['id'];
    this.oBonoService.get(id).subscribe({
      next: (oBono: IBono) => {
        this.oBono = oBono;
      },
      error: (err) => {
        this.showModal('Error al cargar el bono');
      },
    });
  }

  showModal(mensaje: string) {
    this.strMessage = mensaje;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }

  delete(): void {
    this.oBonoService.delete(this.oBono!.id).subscribe({
      next: (data) => {
        this.showModal('bono con id ' + this.oBono!.id + ' ha sido borrado');
      },
      error: (error) => {
        this.showModal('Error al borrar el bono');
      },
    });
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/bono/plist']);
  };
}
