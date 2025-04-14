import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../service/producto.service';
import { IProducto } from '../../../model/producto.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto.admin.view.routed',
  standalone: true,
  imports: [RouterModule, CommonModule],

  templateUrl: './producto.admin.view.routed.component.html',
  styleUrls: ['./producto.admin.view.routed.component.css'],
})
export class ProductoAdminViewRoutedComponent implements OnInit {
  //
  id: number = 0;
  route: string = '';
  oProducto: IProducto = {} as IProducto;

  //
  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oProductoService: ProductoService
  ) {}

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];

    this.getOne();
  }

  getOne() {
    this.oProductoService.getOne(this.id).subscribe({
      next: (data: IProducto) => {
        this.oProducto = data;
      },
    });
  }
}
