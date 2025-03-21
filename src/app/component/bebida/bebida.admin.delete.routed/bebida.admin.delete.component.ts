import { Component, OnInit } from '@angular/core';
import { BebidaService } from '../../../service/bebida.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IBebida } from '../../../model/bebida.interface';

declare let bootstrap: any;

@Component({
  selector: 'app-bebida-admin-delete-routed',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './bebida.admin.delete.component.html',
  styleUrl: './bebida.admin.delete.component.css',
})
export class BebidaAdminDeleteRoutedComponent implements OnInit {
  oBebida: IBebida | null = null;
  strMessage: string = '';
  myModal: any;

  constructor(
    private oBebidaService: BebidaService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
  ) {}

  ngOnInit(): void {
    let id = this.oActivatedRoute.snapshot.params['id'];
    this.oBebidaService.get(id).subscribe({
      next: (oBebida: IBebida) => {
        this.oBebida = oBebida;
      },
      error: (err) => {
        this.showModal('Error al cargar el bebida');
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
    this.oBebidaService.delete(this.oBebida!.id).subscribe({
      next: (data) => {
        this.showModal(
          'bebida con id ' + this.oBebida!.id + ' ha sido borrado'
        );
      },
      error: (error) => {
        this.showModal('Error al borrar el bebida');
      },
    });
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/bebida/plist']);
  };
}
