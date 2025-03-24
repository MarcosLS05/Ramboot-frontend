import { Component, OnInit } from '@angular/core';
import { SnackService } from '../../../service/snack.service';
import { ISnack } from '../../../model/snack.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-snack.admin.view.routed',
  standalone: true,
  imports: [RouterModule, CommonModule],

  templateUrl: './snack.admin.view.routed.component.html',
  styleUrls: ['./snack.admin.view.routed.component.css'],
})
export class SnackAdminViewRoutedComponent implements OnInit {
  //
  id: number = 0;
  route: string = '';
  oSnack: ISnack = {} as ISnack;
  //
  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oSnackService: SnackService
  ) {}

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];

    this.getOne();
  }

  getOne() {
    this.oSnackService.getOne(this.id).subscribe({
      next: (data: ISnack) => {
        this.oSnack = data;
      },
    });
  }
}
