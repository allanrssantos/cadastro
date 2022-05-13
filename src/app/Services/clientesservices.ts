import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";

import { Clientes } from '../Models/clientes';

@Injectable({
    providedIn: 'root'
})
export class clientesService {
    private apiPath: string = "http://localhost:44351/api/Clientes";

    private http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }


    retornarTodos(): Observable<Clientes[]>{
      return this.http.get(this.apiPath).pipe(
        catchError(this.handleError),
        map(this.jsonDataToClientes)
      )
    }

         buscarPorId(id: number): Observable<Clientes> {
        const url = `${this.apiPath}/${id}`;

        return this.http.get(url).pipe(
          catchError(this.handleError),
          map(this.jsonDataToContato)
        )
      }

      gravar(clientes: Clientes): Observable<Clientes>{
        return this.http.post(this.apiPath, clientes).pipe(
          catchError(this.handleError),
          map(this.jsonDataToContato)
        )
      }

      atualizar(cliente: Clientes): Observable<Clientes>{
        const url = `${this.apiPath}`;
        console.log(cliente);
        return this.http.put(url, cliente).pipe(
          catchError(this.handleError),
          map(() => cliente)
        )
      }

      deletar(id: number): Observable<any>{
        const url = `${this.apiPath}/${id}`;

        return this.http.delete(url).pipe(
          catchError(this.handleError),
          map(() => null)
        )
      }

    // Métodos privados

    private jsonDataToClientes(jsonData: any[]) : Clientes[] {
      const _clientes: Clientes[] = [];
      jsonData.forEach(element => _clientes.push(element as Clientes));
      return _clientes;
  }

    private jsonDataToContato(jsonData: any): Clientes{
        return jsonData as Clientes;
    }

    private handleError(error: any): Observable<any>{
        console.log("ERRO NA REQUISIÇÃO => ", error);
        return throwError(error);
    }
}
