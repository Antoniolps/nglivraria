import { Guid } from "guid-typescript";

export class AtualizarLivroDto{
    id!: Guid; 
    titulo = "";
    subTitulo = "";
    resumo = "";
    qtdPaginas?: number;
    dataPublicacao?: Date;
    editora = "";
    edicao?: number;
    
}