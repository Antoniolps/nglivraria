import { Component, EventEmitter, OnInit, Output, ElementRef, Renderer2} from '@angular/core';
import { Livro } from 'src/app/models/Livro';
import { LivroDto } from 'src/app/models/LivroDto';
import { LivroService } from 'src/app/services/livro.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {
 
  livros: Livro[] = [];
  livroParaEditar?: Livro;
  livroParaCriar?: LivroDto;
  checkbox1 = false;
  checkbox2 = false;

  @Output() updateTabela = new EventEmitter<Livro[]>(); 

  buscarLivro: FormGroup;
  

  constructor(private livroService: LivroService, private fb: FormBuilder, private renderer: Renderer2){
    this.buscarLivro = this.fb.group({
      titulo: ['', [Validators.required]]
    })

  
  }

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
    this.livroService.deleteLivro(livro).subscribe((livros: Livro[]) => this.updateTabela.emit(this.livros = livros));
  }

  pesquisarLivro(){

  }

  desmarcarCheckBox2() {
    if (this.checkbox1) {
      this.checkbox2 = false;
    }
  }

  desmarcarCheckBox1() {
    if (this.checkbox2) {
      this.checkbox1 = false;
    }
  }

  novoCriado(event: Livro[]){
    this.updateTabela.emit(this.livros = event);
  }
  
  
}
