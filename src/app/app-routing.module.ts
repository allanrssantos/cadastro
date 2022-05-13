import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioCadastroComponent } from './formulario-cadastro/formulario-cadastro.component';
import { ListaCadastroComponent } from './lista-cadastro/lista-cadastro.component';
import { DeleteCadastroComponent } from './delete-cadastro/delete-cadastro.component';

const routes: Routes = [
  { path: '', component: ListaCadastroComponent },
  { path: 'cadastro', component: ListaCadastroComponent },
  { path: 'cadastro/novo', component: FormularioCadastroComponent },
  { path: 'cadastro/:id/editar', component: FormularioCadastroComponent },
  { path: 'cadastro/:id/deletar', component: DeleteCadastroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { };
