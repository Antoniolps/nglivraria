import { Guid } from "guid-typescript";

export class LivroDto{
    id?: Guid; 
    titulo = "";
    subTitulo = "";
    resumo = "";
    qtdPaginas?: number;
    dataPublicacao?: Date;
    editora = "";
    edicao?: number;
    nomeAutor= "";
}