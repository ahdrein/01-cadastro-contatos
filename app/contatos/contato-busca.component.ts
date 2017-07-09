import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

import { Contato } from './contato.model';
import { ContatoService } from './contato.service';

@Component({
    moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato-busca.component.html',
    styles: [`
        .cursor-pointer{
            cursor: pointer;
        }
    `]
})

export class ContatoBuscaComponent implements OnInit, OnChanges {
    
    @Input() busca: string;
    @Output() buscaChange: EventEmitter<string> = new EventEmitter<string>();
    contatos: Observable<Contato[]>;
    private termosDaBusca: Subject<string> = new Subject<string>();
    
    constructor(
        private router: Router,
        private contatoService: ContatoService
    ){}

    ngOnInit(): void {
        this.contatos = this.termosDaBusca
            .debounceTime(500) //aguarde 500ms para fazer requisição ao server
            .distinctUntilChanged() //ignore buscas repitidas
            .switchMap(term => term ? this.contatoService.search(term) : Observable.of<Contato[]>([]))
            .catch(err => {
                console.log(err);
                return Observable.of<Contato[]>([]);
            });

        this.contatos.subscribe((contatos: Contato[]) => {
            console.log('Return: ', contatos);
        });
    }

    ngOnChanges(changes: SimpleChanges  ): void {
        let busca: SimpleChange = changes['busca'];
        this.search(busca.currentValue);
    }

    search(termo: string): void{
        this.termosDaBusca.next(termo);
        this.buscaChange.emit(termo);
    }

    verDetalhe(contato: Contato): void{
        let link = ['contato/save', contato.id];
        this.router.navigate(link);
        this.buscaChange.emit('');
    }

    // getActive(isValid: boolean): {}{
    //     return {
    //         'open': isValid
    //     };
    // }
}