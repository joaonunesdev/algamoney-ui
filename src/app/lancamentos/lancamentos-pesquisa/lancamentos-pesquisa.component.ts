import { Component, OnInit, ViewChild } from '@angular/core';
import { LancamentoService, LancamentoFiltro } from '../lancamento.service';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { Table } from 'primeng/components/table/table';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';


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
  @ViewChild('tabela', {static: true}) tabela: Table;

  constructor(private lancamentoService: LancamentoService,
              private toasty: ToastyService,
              private confirmation: ConfirmationService,
              private errorHandler: ErrorHandlerService) {}

  ngOnInit() {
  }

  pesquisar(pagina = 0) {
    this.loading = true;

    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro).subscribe(resultado => {
      this.lancamentos = resultado.lancamentos;
      this.totalRegistros = resultado.totalRegistros;
      this.loading = false;
    }, err => this.errorHandler.handle(err));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      icon: 'pi pi-question-circle',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo).subscribe( () => {
      this.tabela.reset();
      this.toasty.success('Lançamento excluído com sucesso!');
    }, erro => this.errorHandler.handle(erro));
  }

}
