import { Component, OnInit } from "@angular/core";
import { Pessoa, Endereco } from "src/app/core/model";
import { ErrorHandlerService } from "src/app/core/error-handler.service";
import { ToastyService } from "ng2-toasty";
import { PessoaService } from "../pessoa.service";
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-pessoa-cadastro",
  templateUrl: "./pessoa-cadastro.component.html",
  styleUrls: ["./pessoa-cadastro.component.css"]
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService
  ) {}


  ngOnInit() {
    this.pessoa.endereco = new Endereco();
  }

  salvar(form: NgForm) {
    this.pessoaService.salvar(this.pessoa).subscribe( () => {
      this.toasty.success("Pessoa salva com sucesso!");
      form.reset();
    }, erro => {
      this.errorHandler.handle(erro);
    });
  }

}
