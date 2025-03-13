import { Component, OnInit } from '@angular/core';
import { IUsuario } from '../../../model/usuario.interface';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-shared.byemail.routed',
  templateUrl: './shared.byemail.routed.component.html',
  styleUrls: ['./shared.byemail.routed.component.css']
})
export class SharedByemailRoutedComponent implements OnInit {

  email: string = "";
  oUsuario: IUsuario = {} as IUsuario;
  fotoDni: string | undefined;
  modalImage: string = '';

  constructor(private oActivatedRoute: ActivatedRoute, private oUsuarioService: UsuarioService) { }

  ngOnInit() {
    this.email = this.oActivatedRoute.snapshot.params['email'];
    this.getOne();
  }

  
  
    
  
  getOne() {
    this.oUsuarioService.getUsuarioByEmail(this.email).subscribe({
      next: (data: IUsuario) => {
        this.oUsuario = data;
      },
      error: (err) => {
        console.error('Error al obtener los datos del Usuario', err);
      }
    });
  }

}
