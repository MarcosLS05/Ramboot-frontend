import { Injectable } from '@angular/core';
import { ISnack } from '../model/snack.interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../model/model.interface';
import { httpOptions, serverURL } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  serverURL: string = serverURL + '/snacks';

  constructor(private oHttp: HttpClient) {}

  getPage(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string
  ): Observable<IPage<ISnack>> {
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
    return this.oHttp.get<IPage<ISnack>>(URL, httpOptions);
  }

  get(id: number): Observable<ISnack> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<ISnack>(URL);
  }

  create(oSnack: ISnack): Observable<ISnack> {
    const URL: string = `${serverURL}/snacks/new`;
    return this.oHttp.post<ISnack>(URL, oSnack, httpOptions);
  }

  update(oSnack: ISnack): Observable<ISnack> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<ISnack>(URL, oSnack);
  }

  getOne(id: number): Observable<ISnack> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<ISnack>(URL);
  }

  delete(id: number) {
    return this.oHttp.delete(this.serverURL + '/' + id);
  }
}
