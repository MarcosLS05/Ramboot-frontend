import { Component, OnInit } from '@angular/core';
import { ZonaService } from '../../../service/zona.service';
import { IZona } from '../../../model/zona.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zona.admin.view.routed',
  standalone: true,
  imports: [RouterModule, CommonModule],

  templateUrl: './zona.admin.view.routed.component.html',
  styleUrls: ['./zona.admin.view.routed.component.css'],
})
export class ZonaAdminViewRoutedComponent implements OnInit {
  //
  id: number = 0;
  route: string = '';
  oZona: IZona = {} as IZona;
  numeroApuntes: number = 0;
  numeroApuntesAbiertos: number = 0;
  //
  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oZonaService: ZonaService
  ) {}

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];

    this.getOne();
  }

  getOne() {
    this.oZonaService.getOne(this.id).subscribe({
      next: (data: IZona) => {
        this.oZona = data;
      },
    });
  }
}
