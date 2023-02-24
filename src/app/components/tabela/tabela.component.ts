import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Livro } from 'src/app/models/Livro';
import { LivroDto } from 'src/app/models/LivroDto';
import { LivroService } from 'src/app/services/livro.service';


@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {
  @Output() updateTabela = new EventEmitter<Livro[]>();

  livros: Livro[] = [];
  livroParaEditar?: Livro;
  livroParaCriar?: LivroDto;

  constructor(private livroService: LivroService){}

  ngOnInit(){
    this.livroService.getLivros().subscribe((result : Livro[]) => (this.livros = result));
  }

  criarLivro(){
    this.livroParaCriar = new LivroDto();
  }

  editarLivro(livro: Livro){
    this.livroParaEditar = livro;
  }

  deletarLivro(livro: Livro){
    this.livroService.deleteLivro(livro).subscribe((livros: Livro[]) => this.updateTabela.emit(livros));
  }
}
