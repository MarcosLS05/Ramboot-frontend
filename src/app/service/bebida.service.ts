import { Injectable } from '@angular/core';
import { IBebida } from '../model/bebida.interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../model/model.interface';
import { httpOptions, serverURL } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class BebidaService {
  serverURL: string = serverURL + '/bebidas';

  constructor(private oHttp: HttpClient) {}

  getPage(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string
  ): Observable<IPage<IBebida>> {
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
    return this.oHttp.get<IPage<IBebida>>(URL, httpOptions);
  }

  get(id: number): Observable<IBebida> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IBebida>(URL);
  }

  create(oBebida: IBebida): Observable<IBebida> {
    const URL: string = `${serverURL}/bebidas/new`;
    return this.oHttp.post<IBebida>(URL, oBebida, httpOptions);
  }

  update(oBebida: IBebida): Observable<IBebida> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<IBebida>(URL, oBebida);
  }

  getOne(id: number): Observable<IBebida> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IBebida>(URL);
  }

  delete(id: number) {
    return this.oHttp.delete(this.serverURL + '/' + id);
  }
}
