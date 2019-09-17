import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {
  lancamentos = [
    {
      tipo: 'DESPESA',
      descricao: 'Compra de pão',
      dataVencimento: new Date('2017/06/01'),
      dataPagamento: new Date('2018/07/15'),
      valor: 4.55,
      pessoa: 'Padaria do José'
    },
    {
      tipo: 'RECEITA',
      descricao: 'Venda de Software',
      dataVencimento: new Date('2017/06/01'),
      dataPagamento: new Date('2018/07/15'),
      valor: 4.55,
      pessoa: 'Padaria do José'
    },
    {
      tipo: 'DESPESA',
      descricao: 'Compra de pão',
      dataVencimento: new Date('2017/06/01'),
      dataPagamento: new Date('2018/07/15'),
      valor: 4.55,
      pessoa: 'Padaria do José'
    }
  ];

}
