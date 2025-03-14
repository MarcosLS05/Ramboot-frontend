import { Injectable } from '@angular/core';
import { httpOptions, serverURL } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { ITipousuario } from '../model/tipousuario.interface';
import { IPage } from '../model/model.interface';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class tipousuarioService {

serverURL: string = serverURL + '/tipousuario';

  constructor(private oHttp: HttpClient) {}

  getPage(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string
  ): Observable<IPage<ITipousuario>> {
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
    return this.oHttp.get<IPage<ITipousuario>>(URL, httpOptions);
  }

  get(id: number): Observable<ITipousuario> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<ITipousuario>(URL);
  }


  create(otipousuario: ITipousuario): Observable<ITipousuario> {
    const URL: string = `${serverURL}/tipousuario/new`;  // Asegúrate de que "usuario" está en la ruta
    return this.oHttp.post<ITipousuario>(URL, otipousuario, httpOptions);
  }

  update(otipousuario: ITipousuario): Observable<ITipousuario> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<ITipousuario>(URL, otipousuario);
  }

  getOne(id: number): Observable<ITipousuario> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<ITipousuario>(URL);
  }

  delete(id: number) {
    return this.oHttp.delete(this.serverURL + '/' + id);
  }

  getPageSubcuenta(id: number){
    return this.oHttp.get<number>(this.serverURL + "/subcuenta/" + id);
  }


  getXBalance(id: number): Observable<ITipousuario> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/xbalance/' + id;
    return this.oHttp.get<ITipousuario>(URL);
  }


  getPageXBalance(
    page: number,
    size: number,
    id: number
  ): Observable<IPage<ITipousuario>> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/xbalance/' + id;
    if (!page) {
      page = 0;
    }
    URL += '?page=' + page;
    if (!size) {
      size = 10;
    }
    URL += '&size=' + size;

    return this.oHttp.get<IPage<ITipousuario>>(URL, httpOptions);
  }

  getPageXBalanceNoTiene(
    page: number,
    size: number,
    id: number
  ): Observable<IPage<ITipousuario>> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/xbalancenotiene/' + id;
    if (!page) {
      page = 0;
    }
    URL += '?page=' + page;
    if (!size) {
      size = 10;
    }
    URL += '&size=' + size;

    return this.oHttp.get<IPage<ITipousuario>>(URL, httpOptions);
  }
}
