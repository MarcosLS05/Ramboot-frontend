import { Component, OnInit } from '@angular/core';
import { GcontrataService } from '../../../service/gcontrata.service';
import { IGcontrata } from '../../../model/gcontrata.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gcontrata.admin.view.routed',
  standalone: true,
  imports: [RouterModule, CommonModule],

  templateUrl: './gcontrata.admin.view.routed.component.html',
  styleUrls: ['./gcontrata.admin.view.routed.component.css'],
})
export class GcontrataAdminViewRoutedComponent implements OnInit {
  //
  id: number = 0;
  route: string = '';
  oGcontrata: IGcontrata = {} as IGcontrata;
  //
  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oGcontrataService: GcontrataService
  ) {}

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];

    this.getOne();
  }

  getOne() {
    this.oGcontrataService.getOne(this.id).subscribe({
      next: (data: IGcontrata) => {
        this.oGcontrata = data;
      },
    });
  }
}
