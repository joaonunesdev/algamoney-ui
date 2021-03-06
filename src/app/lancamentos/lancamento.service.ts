import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import * as moment from 'moment';
import { Lancamento } from '../core/model';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) {}

  pesquisar(filtro: LancamentoFiltro): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    );
    let params = new HttpParams()
                  .set('page', filtro.pagina.toString())
                  .set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get<any>(`${this.lancamentosUrl}?resumo`, { headers, params }).pipe(
      map( response => {
        const resultado = {
          lancamentos: response.content,
          totalRegistros: response.totalElements
        };
        return resultado;
      })
    );
  }

  salvar(lancamento: Lancamento): Observable<Lancamento> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    ).set(
      'Content-Type',
      'application/json');

    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento, { headers });
  }

  atualizar(lancamento: Lancamento): Observable<Lancamento> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    );

    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento, { headers }).pipe(
      map( response => {
        this.converterStringsParaDatas([response]);
        return response;
      }),
      tap( response => console.log(response))
    );
  }

  buscarPorCodigo(codigo: number): Observable<Lancamento> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    );

    return this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`, { headers }).pipe(
      map( response => {
        this.converterStringsParaDatas([response]);
        return response;
      })
    );
  }

  excluir(codigo: number): Observable<void> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    );

    return this.http.delete<void>(`${this.lancamentosUrl}/${codigo}`, { headers });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
      for (const lancamento of lancamentos) {
        lancamento.dataVencimento = moment(lancamento.dataVencimento,
          'YYYY-MM-DD').toDate();

        if (lancamento.dataPagamento) {
          lancamento.dataPagamento = moment(lancamento.dataPagamento,
            'YYYY-MM-DD').toDate();
        }
      }
  }
}
