import { Component, OnInit } from '@angular/core';
import { Pessoa, Endereco } from 'src/app/core/model';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { PessoaService } from '../pessoa.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {
  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const codigoPessoa = this.route.snapshot.params['codigo'];

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
      this.atualizaTituloEdicao();
    } else {
      this.title.setTitle('Nova pessoa');
      this.pessoa.endereco = new Endereco();
    }
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: NgForm) {
    this.pessoaService.salvar(this.pessoa).subscribe(
      pessoaAdicionada => {
        this.toasty.success('Pessoa salva com sucesso!');
        this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
      },
      erro => {
        this.errorHandler.handle(erro);
      }
    );
  }

  atualizarPessoa(form: NgForm) {
    this.pessoaService.atualizar(this.pessoa).subscribe(
      pessoa => {
        this.pessoa = pessoa;
        this.toasty.success('Pessoa atualizada com sucesso!');
        this.atualizaTituloEdicao();
      },
      erro => {
        this.errorHandler.handle(erro);
      }
    );
  }

  atualizaTituloEdicao() {
    this.title.setTitle(`Editando o cadastro de: ${this.pessoa.nome}`);
  }

  carregarPessoa(codigo: any) {
    this.pessoaService
      .buscarPorCodigo(codigo)
      .subscribe(
        pessoa => (this.pessoa = pessoa),
        erro => this.errorHandler.handle(erro)
      );
  }

  nova(form: NgForm) {
    console.log("Nova pessoa");
    form.reset();
    setTimeout(
      function() {
        this.pessoa = new Pessoa();
      }.bind(this),
      1
    );
    this.router.navigate(['/pessoas/nova']);
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }
}
