
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ServiceInterface } from './../interfaces/service.interface'

import { Observable } from 'rxjs';

import 'rxjs/add/operator/toPromise';

import { Contato } from './contato.model';
import { CONTATOS } from './contatos-mock';

@Injectable()
export class ContatoService implements ServiceInterface<Contato> {

    private headers: Headers = new Headers({'Content-Type':'application/json'});
    private contatosUrl: string = 'app/contatos';
    
    private handleError(err: any): Promise<any>{
        console.log('Error: ', err);
        return Promise.reject(err.message || err);
    }

    constructor(
        private http: Http
    ){}

    findall(): Promise<Contato[]> {
        return this.http.get(this.contatosUrl)
            .toPromise()
            .then(response => response.json().data as Contato[])
            .catch(this.handleError);
    }
    
    find(id:number): Promise<Contato>{
        return this.findall()
            .then((contatos: Contato[]) => contatos.find(contato => contato.id === id));
    
    }

    create(contato: Contato): Promise<Contato>{
        return this.http
        .post(this.contatosUrl, JSON.stringify(contato), {headers: this.headers})
        .toPromise()
        .then((response: Response) => response.json().data as Contato)
        .catch(this.handleError);
    }

    update(contato: Contato): Promise<Contato>{
        const url = `${this.contatosUrl}/${contato.id}`;
        return this.http
        .put(url, JSON.stringify(contato), {headers: this.headers})
        .toPromise()
        .then(() => contato as Contato)
        .catch(this.handleError);
    }

    delete(contato: Contato): Promise<Contato>{
        const url = `${this.contatosUrl}/${contato.id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => contato as Contato)
            .catch(this.handleError);
    }

    search(term: string): Observable<Contato[]>{
        return this.http
            .get(`${this.contatosUrl}/?nome=${term}`)
            .map((res: Response) => res.json().data as Contato[]);
    }
}