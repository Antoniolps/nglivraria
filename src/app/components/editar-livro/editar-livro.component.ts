import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AtualizarLivroDto } from 'src/app/models/AtualizarLivroDto';
import { AtualizarAutorDto } from 'src/app/models/AtulizarAutorDto';
import { Autor } from 'src/app/models/Autor';
import { AutorDto } from 'src/app/models/AutorDto';
import { AutorLivroDto } from 'src/app/models/AutorLivroDto';
import { CriarAutorDto } from 'src/app/models/CriarAutorDto';
import { Livro } from 'src/app/models/Livro';
import { AutorService } from 'src/app/services/autor.service';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-editar-livro',
  templateUrl: './editar-livro.component.html',
  styleUrls: ['./editar-livro.component.scss']
})
export class EditarLivroComponent implements OnInit {
  @Input() livro?: Livro;
  @Input() autor!: Autor;
  @Output() livroOut = new EventEmitter<Livro>();
  @Output() autorOut = new EventEmitter<Autor>();
  @Output() autorOut2 = new EventEmitter<Autor[]>();

  autorParaCriar?: AutorDto;

  constructor(private livroService: LivroService, private autorService: AutorService) { }

  ngOnInit(): void {
  }

  async atualizarLivro(livro: Livro){
    let livroAtualizar = new AtualizarLivroDto;

    livroAtualizar.id = livro.id;
    livroAtualizar.titulo = livro.titulo;
    livroAtualizar.subTitulo = livro.subTitulo;
    livroAtualizar.resumo = livro.resumo;
    livroAtualizar.qtdPaginas = livro.qtdPaginas;
    livroAtualizar.dataPublicacao = livro.dataPublicacao;
    livroAtualizar.editora = livro.editora;
    livroAtualizar.edicao = livro.edicao;

    (await this.livroService.updateLivro(livroAtualizar)).subscribe((livro: Livro) => this.livroOut.emit(livro));
    
    }
  

  deletarAutor(autor: Autor, livro : Livro){
    let desacociar = new AutorLivroDto
    desacociar.idAutor = autor.id.toString();
    desacociar.idLivro = livro.id.toString();
    this.livroService.apagarAutorLivro(desacociar).subscribe((livro : Livro) => this.livroOut.emit(livro));
  }

  async criarNovoAutor(autor: Autor, livro: Livro){
    (await this.livroService.createAutorLivro(livro.id.toString() , autor.id.toString())).subscribe();
  }
  
  novoAutor() {
    this.autorParaCriar = new AutorDto;
  }
}
