import { Component, OnInit } from '@angular/core';
import { BonoService } from '../../../service/bono.service';
import { IBono } from '../../../model/bono.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bono.admin.view.routed',
  standalone: true,
  imports: [RouterModule, CommonModule],

  templateUrl: './bono.admin.view.routed.component.html',
  styleUrls: ['./bono.admin.view.routed.component.css'],
})
export class BonoAdminViewRoutedComponent implements OnInit {
  //
  id: number = 0;
  route: string = '';
  oBono: IBono = {} as IBono;
  numeroApuntes: number = 0;
  numeroApuntesAbiertos: number = 0;
  //
  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oBonoService: BonoService
  ) {}

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];

    this.getOne();
  }

  getOne() {
    this.oBonoService.getOne(this.id).subscribe({
      next: (data: IBono) => {
        this.oBono = data;
      },
    });
  }
}
