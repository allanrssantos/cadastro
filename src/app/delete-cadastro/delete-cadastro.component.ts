import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { clientesService } from '../Services/clientesservices';
import { switchMap } from 'rxjs/operators';
import { Clientes } from '../Models/clientes';

@Component({
  selector: 'app-delete-cadastro',
  templateUrl: './delete-cadastro.component.html',
  styles: []
})
export class DeleteCadastroComponent implements OnInit {

  clientes: Clientes;


  constructor(
    private _clientesService: clientesService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.clientes = new Clientes();

    this.route.paramMap.pipe(
      switchMap(params => this._clientesService.buscarPorId(+params.get("id")))
    )
    .subscribe(
      (c)=>{
        this.clientes = c;
      },
      () => alert('Ocorreu um erro no servidor, tente novamente.')
    )
  }

  deletarCadastro() {
    this._clientesService.deletar(this.clientes.id).subscribe(
      () => this.router.navigateByUrl("cadastro"),
      () => alert("Erro ao tentar excluir")
    )
  }

}
