import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pessoa } from '../core/model';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) {}

  pesquisar(filtro: PessoaFiltro): Observable<any> {
    let params = new HttpParams()
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString());
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    );

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get<any>(this.pessoasUrl, { headers, params }).pipe(
      map(response => {
        console.log(response);
        const resultado = {
          pessoas: response.content,
          totalRegistros: response.totalElements
        };
        console.log(resultado);
        return resultado;
      })
    );
  }

  listarTodas(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    );

    return this.http.get<any>(`${this.pessoasUrl}/todas`, { headers });
  }

  excluir(codigo: number): Observable<void> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    );

    return this.http.delete<any>(`${this.pessoasUrl}/${codigo}`, { headers });
  }

  ativar(codigo: any) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    ).set(
      'Content-Type',
      'application/json');

    return this.http.put<any>(`${this.pessoasUrl}/${codigo}/ativo`, 'true', { headers });
  }

  desativar(codigo: any) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    ).set(
    'Content-Type',
    'application/json');

    return this.http.put<any>(`${this.pessoasUrl}/${codigo}/ativo`, 'false', { headers });
  }


  salvar(pessoa: Pessoa): Observable<Pessoa> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    );

    return this.http.post<Pessoa>(this.pessoasUrl, pessoa, { headers });
  }

}
