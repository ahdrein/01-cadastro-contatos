
import { Component, OnInit } from '@angular/core';
import { Contato } from './contato.model';
import { ContatoService } from './contato.service';
import { CONTATOS } from './contatos-mock';
import { DialogService } from './../dialog.service';

@Component({
    moduleId: module.id,
    selector: 'contatos-lista',
    templateUrl: 'contatos-lista.component.html',

    // styleUrls: [
    //     'contatos-lista.component.css'
    // ]
})
export class ContatosListaComponent {

    contatos: Contato[] = [];
    mensagem: {};
    classesCSS: {};
    private currentTimeout;

    constructor(
        private dialogService: DialogService,
        private contatoService: ContatoService
    ){}

    ngOnInit(): void{
        this.contatoService.findall()
            .then((contatos: Contato[]) => {
                this.contatos = contatos;               
            })
            .catch(err => {
                console.log(err);
                this.mostrarMensagem({
                    tipo: 'danger',
                    texto: 'Ocorreu um erro ao buscar a lista de contatos'
                });                
            });
    }

    onDelete(contato: Contato): void{
        this.dialogService.confirm('Deseja deletar: ' + contato.nome)
            .then((canDelete: boolean) => {
                if(canDelete){
                    this.contatoService
                        .delete(contato)
                        .then(() => {
                            this.contatos = this.contatos.filter((c: Contato) => c.id != contato.id);
                            this.mostrarMensagem({
                                tipo: 'success',
                                texto: 'Contato deletado'
                            });
                        }).catch(err=>{
                            console.log(err);
                            this.mostrarMensagem({
                                tipo: 'danger',
                                texto: 'Ocorreu um erro ao deletar o contato'
                            });
                        });
                }
            });
    }

    private mostrarMensagem(mensagem: {tipo: string, texto: string}): void{
        this.mensagem = mensagem;
        this.montarClasses(mensagem.tipo);
        if(mensagem.tipo != 'danger'){
            if(this.currentTimeout){
                clearTimeout(this.currentTimeout);
            }
            this.currentTimeout = setTimeout(() => {
                this.mensagem = undefined;
            }, 3000);
        }
    }

    private montarClasses(tipo: string): void{
        this.classesCSS = {
            'alert': true
        };
        this.classesCSS['alert-' + tipo] = true;
    }
}