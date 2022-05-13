import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { clientesService } from '../Services/clientesservices';
import { switchMap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Clientes } from '../Models/clientes';


@Component({
  selector: 'app-formulario-cadastro',
  templateUrl: './formulario-cadastro.component.html',
  styles: []
})
export class FormularioCadastroComponent implements OnInit {

  contatoForm: FormGroup;
  submittingForm: boolean = false;
  currentAction: string;
  clientes: Clientes;
  pageTitle: string;

  constructor(
    private _clientesService: clientesService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.clientes = new Clientes();
    this.setCurrentAction();
  }

  ngAfterContentChecked(){
    this.atualizarPageTitle();
  }

  private setCurrentAction() {
    if(this.route.snapshot.url[1].path == "novo"){
      this.currentAction = "new";
    }
    else
    {
      this.currentAction = "edit";
      this.carregarCadastro();
    }
  }

  submitForm(cadastroForm) {
      this.submittingForm = true;
    if (this.currentAction == "new") {
      this.criarCadastro(cadastroForm);
    }
    else {
      this.atualizarCadastro(cadastroForm);
    }
  }
   private carregarCadastro() {
    if(this.currentAction == "edit"){
      this.route.paramMap.pipe(

        switchMap(params => this._clientesService.buscarPorId(+params.get("id")))
      )
      .subscribe(
        (c)=>{
          this.clientes = c;
        },
        (error) => alert('Ocorreu um erro no servidor, tente novamente.')
      )
    }
  }

  private criarCadastro(cadastroForm) {
    const clienteTela: Clientes = Object.assign(new Clientes(), cadastroForm.value);
       this._clientesService.gravar(clienteTela)
       .subscribe(
          () => this.cadastroGravadoComSucesso(),
          error => this.erroAoGravarCadastro(error)
       )
  }

  private atualizarCadastro(cadastroForm) {
    const clienteTela: Clientes = Object.assign(new Clientes(), cadastroForm.value);

    this._clientesService.atualizar(clienteTela)
      .subscribe(
        () => this.cadastroGravadoComSucesso(),
        error => this.erroAoGravarCadastro(error)
      )
  }

  private cadastroGravadoComSucesso() {
    this.router.navigateByUrl("cadastro")
  }

  private erroAoGravarCadastro(error) {
    alert(error.body.error);
  }

  private atualizarPageTitle() {
    if(this.currentAction == "new")
      this.pageTitle = "Novo Cadastro";
    else{
      const cadastroNome = this.clientes.nome || ""
      this.pageTitle = "Editando Cadastro: " + cadastroNome;
    }
  }
}
