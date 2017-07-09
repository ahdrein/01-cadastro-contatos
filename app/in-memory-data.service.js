"use strict";
class InMemoryDataService {
    createDb() {
        let contatos = [
            { id: 1, nome: 'Andre Ramos', email: 'andre@andre.com', telefone: '(13) 3333-3333' },
            { id: 2, nome: 'Mauro Silva', email: 'msilva@gmail.com', telefone: '(13) 3333-3333' },
            { id: 3, nome: 'Guilherme Mendes', email: 'gmendes@gmail.com', telefone: '(13) 3333-3333' },
            { id: 4, nome: 'Felipe Araujo', email: 'faraujo@gmail.com', telefone: '(13) 3333-3333' },
            { id: 5, nome: 'Fernanda Ramos', email: 'framos@gmail.com', telefone: '(13) 3333-3333' },
            { id: 6, nome: 'Caio Reis', email: 'creis@gmail.com', telefone: '(13) 3333-3333' },
            { id: 7, nome: 'Juliana Lemos', email: 'jlemos@gmail.com', telefone: '(13) 3333-3333' },
        ];
        return { contatos };
    }
}
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map