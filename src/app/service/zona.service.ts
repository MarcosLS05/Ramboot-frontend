import { Injectable } from '@angular/core';
import { IZona } from '../model/zona.interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../model/model.interface';
import { httpOptions, serverURL } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ZonaService {
  serverURL: string = serverURL + '/zona';

  constructor(private oHttp: HttpClient) {}

  getPage(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string
  ): Observable<IPage<IZona>> {
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
    return this.oHttp.get<IPage<IZona>>(URL, httpOptions);
  }

  get(id: number): Observable<IZona> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IZona>(URL);
  }

  create(oZona: IZona): Observable<IZona> {
    const URL: string = `${serverURL}/zona/new`;
    return this.oHttp.post<IZona>(URL, oZona, httpOptions);
  }

  update(oZona: IZona): Observable<IZona> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<IZona>(URL, oZona);
  }

  getAll(): Observable<{ content: IZona[] }> {
    const URL: string = `${this.serverURL}/all`;
    return this.oHttp.get<{ content: IZona[] }>(URL);
  }

  getOne(id: number): Observable<IZona> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IZona>(URL);
  }

  delete(id: number) {
    return this.oHttp.delete(this.serverURL + '/' + id);
  }
}
