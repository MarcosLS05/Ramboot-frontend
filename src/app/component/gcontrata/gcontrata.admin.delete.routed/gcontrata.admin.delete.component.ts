import { Component, OnInit } from '@angular/core';
import { GcontrataService } from '../../../service/gcontrata.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IGcontrata } from '../../../model/gcontrata.interface';

declare let bootstrap: any;

@Component({
  selector: 'app-gcontrata-admin-delete-routed',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './gcontrata.admin.delete.component.html',
  styleUrl: './gcontrata.admin.delete.component.css',
})
export class GcontrataAdminDeleteRoutedComponent implements OnInit {
  oGcontrata: IGcontrata | null = null;
  strMessage: string = '';
  myModal: any;

  constructor(
    private oGcontrataService: GcontrataService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
  ) {}

  ngOnInit(): void {
    let id = this.oActivatedRoute.snapshot.params['id'];
    this.oGcontrataService.get(id).subscribe({
      next: (oGcontrata: IGcontrata) => {
        this.oGcontrata = oGcontrata;
      },
      error: (err) => {
        this.showModal('Error al cargar el gcontrata');
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
    this.oGcontrataService.delete(this.oGcontrata!.id).subscribe({
      next: (data) => {
        this.showModal(
          'gcontrata con id ' + this.oGcontrata!.id + ' ha sido borrado'
        );
      },
      error: (error) => {
        this.showModal('Error al borrar el gcontrata');
      },
    });
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/gcontrata/plist']);
  };
}
