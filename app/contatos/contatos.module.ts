
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContatoBuscaComponent } from './contato-busca.component';
import { ContatosListaComponent } from './contatos-lista.component';
import { ContatoDetalheComponent } from './contato-detalhe.component';
import { ContatoRoutingModule } from './contato-routing.module';
import { ContatoService } from './contato.service';

@NgModule({
    imports:[
        CommonModule,
        ContatoRoutingModule,
        FormsModule //declara modulos
    ],
    declarations: [
        ContatoBuscaComponent,
        ContatosListaComponent, 
        ContatoDetalheComponent //declara components
    ],
    providers: [
        ContatoService //declara serviços
    ],
    exports: [
        ContatoBuscaComponent
    ]
})

export class ContatosModule {

}