import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaService, PessoaFiltro } from '../pessoa.service';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';
import { Table } from 'primeng/components/table/table';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  @ViewChild('tabela', { static: true}) tabela: Table;
  filtro = new PessoaFiltro();
  pessoas = [];
  totalRegistros = 0;
  loading: boolean;

  constructor(private pessoaService: PessoaService,
              private errorHandler: ErrorHandlerService,
              private toasty: ToastyService,
              private confirmation: ConfirmationService) {}

  ngOnInit(): void {
  }

  pesquisar(pagina = 0) {
    this.loading = true;

    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro).subscribe(resultado => {
      this.pessoas = resultado.pessoas;
      this.totalRegistros = resultado.totalRegistros;
      this.loading = false;
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmaExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      icon: 'pi pi-question-circle',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo).subscribe(
      () => {
        this.tabela.reset();
        this.toasty.success('Pessoa excluída com sucesso!');
      },
      erro => this.errorHandler.handle(erro));
  }

  refresh() {
    this.tabela.reset();
  }

  ativar(pessoa: any) {
    this.pessoaService.ativar(pessoa.codigo).subscribe(
      () => {
        this.toasty.success('Pessoa ativada com sucesso');
        this.refresh();
      },
      erro => this.errorHandler.handle(erro));
  }

  desativar(pessoa: any) {
    this.pessoaService.desativar(pessoa.codigo).subscribe(
      () => {
        this.toasty.success('Pessoa desativada com sucesso');
        this.refresh();
      },
      erro => this.errorHandler.handle(erro));
  }

}
