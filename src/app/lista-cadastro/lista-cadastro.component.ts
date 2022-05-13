import { Component, OnInit } from '@angular/core';
import { Clientes } from '../Models/clientes';
import { clientesService } from '../Services/clientesservices';

@Component({
  selector: 'app-lista-cadastro',
  templateUrl: './lista-cadastro.component.html',
  styles: []
})
export class ListaCadastroComponent implements OnInit {

  clientes: Clientes[] = [];

  constructor(
    private _clientesService: clientesService,
  ) { }

  ngOnInit() {

    this._clientesService.retornarTodos().subscribe(
      c => this.clientes = c,
      error => alert('Erro ao carregar a lista')
    )
  }

  get filtrarCadastro() {
    return this.clientes.filter( x => x.id > 0);
  }
}
