import { Component, OnInit } from '@angular/core';
import { ZonaService } from '../../../service/zona.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IZona } from '../../../model/zona.interface';

declare let bootstrap: any;

@Component({
  selector: 'app-zona-admin-delete-routed',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './zona.admin.delete.component.html',
  styleUrl: './zona.admin.delete.component.css',
})
export class ZonaAdminDeleteRoutedComponent implements OnInit {
  oZona: IZona | null = null;
  strMessage: string = '';
  myModal: any;

  constructor(
    private oZonaService: ZonaService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
  ) {}

  ngOnInit(): void {
    let id = this.oActivatedRoute.snapshot.params['id'];
    this.oZonaService.get(id).subscribe({
      next: (oZona: IZona) => {
        this.oZona = oZona;
      },
      error: (err) => {
        this.showModal('Error al cargar el zona');
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
    this.oZonaService.delete(this.oZona!.id).subscribe({
      next: (data) => {
        this.showModal('zona con id ' + this.oZona!.id + ' ha sido borrado');
      },
      error: (error) => {
        this.showModal('Error al borrar el zona');
      },
    });
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/zona/plist']);
  };
}
