import { Component, OnInit } from '@angular/core';
import { LancamentoService, LancamentoFiltro } from '../lancamento.service';

import { LazyLoadEvent } from 'primeng/components/common/api';


@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  loading: boolean;

  constructor(private lancamentoService: LancamentoService) {}

  ngOnInit() {
  }

  pesquisar(pagina = 0) {
    this.loading = true;

    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro).subscribe(resultado => {
      this.lancamentos = resultado.lancamentos;
      this.totalRegistros = resultado.totalRegistros;
      this.loading = false;
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    console.log(event);
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

}
