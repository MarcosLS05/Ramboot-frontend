import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ITipousuario } from '../../../model/tipousuario.interface';
import { tipousuarioService } from '../../../service/tipousuario.service';


@Component({
  selector: 'app-tipousuario-admin-view-routed',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tipousuario.admin.view.routed.component.html',
  styleUrls: ['./tipousuario.admin.view.routed.component.css'],
})
export class TipousuarioAdminViewRoutedComponent implements OnInit {
  id: number = 0;
  route: string = '';
  otipousuario: ITipousuario = {} as ITipousuario;
  
  constructor(
    private oActivatedRoute: ActivatedRoute,
    private otipousuarioService: tipousuarioService
  ) {}

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    this.getOne();
  }
getOne() {
    this.otipousuarioService.getOne(this.id).subscribe({
      next: (data: ITipousuario) => {
        this.otipousuario = data;
      },
    });
  }
}
