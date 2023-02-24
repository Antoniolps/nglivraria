import { Guid } from "guid-typescript";
import { Autor } from "./Autor";

export class Livro{
    id!: Guid; 
    titulo = "";
    subTitulo = "";
    resumo = "";
    qtdPaginas?: number;
    dataPublicacao?: Date;
    editora = "";
    edicao?: number;
    autores!: Array<Autor>;
}