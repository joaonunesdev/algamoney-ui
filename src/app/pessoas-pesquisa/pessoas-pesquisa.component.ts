import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  pessoas = [
    {nome: 'Manoel Pinheiro', cidade: 'Uberlândia', estado: 'MG', ativo: false},
    {nome: 'Manoel Pinheiro', cidade: 'Uberlândia', estado: 'MG', ativo: true},
    {nome: 'Manoel Pinheiro', cidade: 'Uberlândia', estado: 'MG', ativo: true}
  ];

}
