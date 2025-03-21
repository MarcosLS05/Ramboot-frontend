import { Component, OnInit } from '@angular/core';
import { BebidaService } from '../../../service/bebida.service';
import { IBebida } from '../../../model/bebida.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bebida.admin.view.routed',
  standalone: true,
  imports: [RouterModule, CommonModule],

  templateUrl: './bebida.admin.view.routed.component.html',
  styleUrls: ['./bebida.admin.view.routed.component.css'],
})
export class BebidaAdminViewRoutedComponent implements OnInit {
  //
  id: number = 0;
  route: string = '';
  oBebida: IBebida = {} as IBebida;
  numeroApuntes: number = 0;
  numeroApuntesAbiertos: number = 0;
  //
  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oBebidaService: BebidaService
  ) {}

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];

    this.getOne();
  }

  getOne() {
    this.oBebidaService.getOne(this.id).subscribe({
      next: (data: IBebida) => {
        this.oBebida = data;
      },
    });
  }
}
