import { Injectable } from '@angular/core';
import { IUsuario } from '../model/usuario.interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../model/model.interface';
import { httpOptions, serverURL } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  serverURL: string = serverURL + '/usuarios';

  constructor(private oHttp: HttpClient) {}

  getPage(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string
  ): Observable<IPage<IUsuario>> {
    let URL: string = '';
    URL += this.serverURL;
    if (!page) {
      page = 0;
    }
    URL += '?page=' + page;
    if (!size) {
      size = 10;
    }
    URL += '&size=' + size;
    if (field) {
      URL += '&sort=' + field;
      if (dir === 'asc') {
        URL += ',asc';
      } else {
        URL += ',desc';
      }
    }
    if (filtro) {
      URL += '&filter=' + filtro;
    }
    return this.oHttp.get<IPage<IUsuario>>(URL, httpOptions);
  }

  getPageXTipoUsuario(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string,
    id_tipo_usuario: number
  ): Observable<IPage<IUsuario>> {
    let URL: string = '';
    URL += this.serverURL + '/xtipousuario/' + id_tipo_usuario;
    if (!page) {
      page = 0;
    }
    URL += '?page=' + page;
    if (!size) {
      size = 10;
    }
    URL += '&size=' + size;
    if (field) {
      URL += '&sort=' + field;
      if (dir === 'asc') {
        URL += ',asc';
      } else {
        URL += ',desc';
      }
    }
    if (filtro) {
      URL += '&filter=' + filtro;
    }
    return this.oHttp.get<IPage<IUsuario>>(URL, httpOptions);
  }

  getPageXPlanesentrenamiento(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string,
    id_planesentrenamiento: number
  ): Observable<IPage<IUsuario>> {
    let URL: string = '';
    URL += this.serverURL + '/xplanesentrenamiento/' + id_planesentrenamiento;
    if (!page) {
      page = 0;
    }
    URL += '?page=' + page;
    if (!size) {
      size = 10;
    }
    URL += '&size=' + size;
    if (field) {
      URL += '&sort=' + field;
      if (dir === 'asc') {
        URL += ',asc';
      } else {
        URL += ',desc';
      }
    }
    if (filtro) {
      URL += '&filter=' + filtro;
    }
    return this.oHttp.get<IPage<IUsuario>>(URL, httpOptions);
  }
  get(id: number): Observable<IUsuario> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IUsuario>(URL);
  }

  searchByUsername(username: string): Observable<IUsuario[]> {
    return this.oHttp.get<IUsuario[]>(`${this.serverURL}/search`, {
      params: { username },
    });
  }

  create(oUsuario: IUsuario): Observable<IUsuario> {
    const URL: string = `${serverURL}/usuarios/new`;
    return this.oHttp.post<IUsuario>(URL, oUsuario, httpOptions);
  }

  update(oUsuario: IUsuario): Observable<IUsuario> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<IUsuario>(URL, oUsuario);
  }

  getOne(id: number): Observable<IUsuario> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IUsuario>(URL);
  }

  getUsuarioByEmail(email: string): Observable<IUsuario> {
    let URL: string = '';
    URL += this.serverURL + '/byemail';
    URL += '/' + email;
    return this.oHttp.get<IUsuario>(URL);
  }

  delete(id: number) {
    return this.oHttp.delete(this.serverURL + '/' + id);
  }

  setTipousuario(id: number, id_tipousuario: number): Observable<IUsuario> {
    return this.oHttp.put<IUsuario>(
      this.serverURL + '/settipousuario/' + id + '/' + id_tipousuario,
      null
    );
  }
}
