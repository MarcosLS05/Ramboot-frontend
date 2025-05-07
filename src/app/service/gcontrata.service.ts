import { Injectable } from '@angular/core';
import { IGcontrata } from '../model/gcontrata.interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../model/model.interface';
import { httpOptions, serverURL } from '../environment/environment';
import { IGcontrataproducto } from '../model/gcontrataproducto.interface';

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
      console.log('Ordenando por:', field); // Depuración
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

  getPageXUsuario(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string,
    id_usuario: number
  ): Observable<IPage<IGcontrata>> {
    let URL: string = '';
    URL += this.serverURL + '/xusuario/' + id_usuario;
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

  addImporte(
    gcontrataEntity: IGcontrata,
    usuarioId: number,
    productosComprados: IGcontrataproducto[] | null,
    montoParaSaldo: number
  ): Observable<IGcontrata> {
    const URL: string = `${this.serverURL}/add-importe`;
  
    // LIMPIAR el objeto que se va a enviar (evitar referencias circulares)
    const cleanGcontrata = {
      importe: gcontrataEntity.importe,
      metodoPago: gcontrataEntity.metodoPago,
      fecha_creacion: gcontrataEntity.fecha_creacion,
    };
  
    const cleanProductos = productosComprados?.map(p => ({
      producto: { id: p.producto.id },
      cantidad: p.cantidad
    })) ?? [];
  
    console.log('Productos a enviar:', cleanProductos);  // Verifica los productos en la consola.
  
    const body = {
      gcontrataEntity: cleanGcontrata,
      productosComprados: cleanProductos,
      montoParaSaldo: montoParaSaldo,
    };
  
    return this.oHttp.post<IGcontrata>(URL, body, {
      params: { usuarioId: usuarioId.toString() },
    });
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
