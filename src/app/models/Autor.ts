import { Guid } from "guid-typescript";
import { Livro } from "./Livro";

export class Autor{
    id!: Guid;
    nome = "";
    livros?: Array<Livro>;
}