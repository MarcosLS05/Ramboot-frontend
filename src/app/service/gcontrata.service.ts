import { Injectable } from '@angular/core';
import { IGcontrata } from '../model/gcontrata.interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../model/model.interface';
import { httpOptions, serverURL } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class GcontrataService {
  serverURL: string = serverURL + '/gcontrata';

  constructor(private oHttp: HttpClient) {}

  getPage(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string
  ): Observable<IPage<IGcontrata>> {
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
    return this.oHttp.get<IPage<IGcontrata>>(URL, httpOptions);
  }

  get(id: number): Observable<IGcontrata> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IGcontrata>(URL);
  }

  create(oGcontrata: IGcontrata): Observable<IGcontrata> {
    const URL: string = `${serverURL}/gcontrata/new`;
    return this.oHttp.post<IGcontrata>(URL, oGcontrata, httpOptions);
  }

  getTicket(): Observable<string> {
    const URL: string = `${serverURL}/gcontrata/genTicketRandom`;
    return this.oHttp.post<string>(URL, {});
  }

  update(oGcontrata: IGcontrata): Observable<IGcontrata> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<IGcontrata>(URL, oGcontrata);
  }

  getOne(id: number): Observable<IGcontrata> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IGcontrata>(URL);
  }

  delete(id: number) {
    return this.oHttp.delete(this.serverURL + '/' + id);
  }
}
