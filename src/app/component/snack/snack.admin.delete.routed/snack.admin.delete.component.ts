import { Component, OnInit } from '@angular/core';
import { SnackService } from '../../../service/snack.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ISnack } from '../../../model/snack.interface';

declare let bootstrap: any;

@Component({
  selector: 'app-snack-admin-delete-routed',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './snack.admin.delete.component.html',
  styleUrl: './snack.admin.delete.component.css',
})
export class SnackAdminDeleteRoutedComponent implements OnInit {
  oSnack: ISnack | null = null;
  strMessage: string = '';
  myModal: any;

  constructor(
    private oSnackService: SnackService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
  ) {}

  ngOnInit(): void {
    let id = this.oActivatedRoute.snapshot.params['id'];
    this.oSnackService.get(id).subscribe({
      next: (oSnack: ISnack) => {
        this.oSnack = oSnack;
      },
      error: (err) => {
        this.showModal('Error al cargar el snack');
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
    this.oSnackService.delete(this.oSnack!.id).subscribe({
      next: (data) => {
        this.showModal('snack con id ' + this.oSnack!.id + ' ha sido borrado');
      },
      error: (error) => {
        this.showModal('Error al borrar el snack');
      },
    });
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/snack/plist']);
  };
}
