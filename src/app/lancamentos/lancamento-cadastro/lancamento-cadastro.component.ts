import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { Lancamento } from 'src/app/core/model';
import { FormControl, NgForm } from '@angular/forms';
import { ToastComponent, ToastyService } from 'ng2-toasty';
import { LancamentoService } from '../lancamento.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {
  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private lancamentoService: LancamentoService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit() {
    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
      console.log(this.lancamento);

      this.atualizaTituloEdicao();
    } else {
      this.title.setTitle('Novo lançamento');
    }

    this.carregarCategorias();
    this.carregarPessoas();
    console.log(this.route.snapshot.params['codigo']);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService
      .buscarPorCodigo(codigo)
      .subscribe(
        lancamento => (this.lancamento = lancamento),
        erro => this.errorHandler.handle(erro)
      );
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: NgForm) {
    this.lancamentoService.salvar(this.lancamento).subscribe(
      (lancamentoAdicionado) => {
        this.toasty.success('Lançamento cadastro com sucesso!');
        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
      },
      erro => {
        this.errorHandler.handle(erro);
      }
    );
  }

  atualizarLancamento(form: NgForm) {
    this.lancamentoService.atualizar(this.lancamento).subscribe(
      lancamento => {
        this.lancamento = lancamento;
        this.toasty.success('Lançamento atualizado com sucesso!');
        this.atualizaTituloEdicao();
      },
      erro => {
        this.errorHandler.handle(erro);
      }
    );
  }

  carregarCategorias() {
    this.categoriaService.listarTodas().subscribe(categoriasResponse => {
      this.categorias = categoriasResponse.map(categoria => {
        return { label: categoria.nome, value: categoria.codigo };
      });
    });
  }

  carregarPessoas() {
    this.pessoaService.listarTodas().subscribe(pessoas => {
      this.pessoas = pessoas.map(p => {
        return { label: p.nome, value: p.codigo };
      });
    });
  }

  novo(form: NgForm) {
    form.reset();
    setTimeout(
      function() {
        this.lancamento = new Lancamento();
      }.bind(this),
      1
    );
    this.router.navigate(['/lancamentos/novo']);
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  atualizaTituloEdicao() {
    this.title.setTitle(`Editando o lançamento: ${this.lancamento.descricao}`);
  }
}
