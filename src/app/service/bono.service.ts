import { Injectable } from '@angular/core';
import { IBono } from '../model/bono.interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../model/model.interface';
import { httpOptions, serverURL } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class BonoService {
  serverURL: string = serverURL + '/bono';

  constructor(private oHttp: HttpClient) {}

  getPage(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string
  ): Observable<IPage<IBono>> {
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
    return this.oHttp.get<IPage<IBono>>(URL, httpOptions);
  }

  get(id: number): Observable<IBono> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IBono>(URL);
  }

  create(oBono: IBono): Observable<IBono> {
    const URL: string = `${serverURL}/bono/new`;
    return this.oHttp.post<IBono>(URL, oBono, httpOptions);
  }

  update(oBono: IBono): Observable<IBono> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<IBono>(URL, oBono);
  }

  getOne(id: number): Observable<IBono> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IBono>(URL);
  }

  delete(id: number) {
    return this.oHttp.delete(this.serverURL + '/' + id);
  }

  setSnack(id: number, id_snack: number): Observable<IBono> {
    return this.oHttp.put<IBono>(
      this.serverURL + '/setsnack/' + id + '/' + id_snack,
      null
    );
  }

  setBebida(id: number, id_bebida: number): Observable<IBono> {
    return this.oHttp.put<IBono>(
      this.serverURL + '/setbebida/' + id + '/' + id_bebida,
      null
    );
  }

  setZona(id: number, id_zona: number): Observable<IBono> {
    return this.oHttp.put<IBono>(
      this.serverURL + '/setzona/' + id + '/' + id_zona,
      null
    );
  }
}
