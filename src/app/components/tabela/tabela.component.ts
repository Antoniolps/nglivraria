import { Component, EventEmitter, OnInit, Output} from '@angular/core';
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
  @Output() pesquisadoTabela = new EventEmitter<boolean>();
  buscarLivro: FormGroup;
  isDialogVisible: boolean = false;
  isDialogVisibleEdit: boolean = false;
  dialogTitulo = '';
  pesquisado: boolean = false;
  

  constructor(private livroService: LivroService, private fb: FormBuilder){
    this.buscarLivro = this.fb.group({
      paraPesquisar: ['', [Validators.required]]
    })

  
  }

  ngOnInit(){
    this.livroService.getLivros().subscribe((result : Livro[]) => (this.livros = result));
  }

  dialogFechar(){
    this.isDialogVisible = false;
  }

  dialogFecharEdit(){
    this.isDialogVisibleEdit = false;
  }

  criarLivro(){
    this.livroParaCriar = new LivroDto();
    this.isDialogVisible = true;
    this.dialogTitulo = "Criar";
  }

  editarLivro(livro: Livro){
    this.livroParaEditar = livro;
    this.isDialogVisibleEdit = true;
    this.dialogTitulo = "Editar";
  }

  deletarLivro(livro: Livro){
    this.livroService.deleteLivro(livro).subscribe((livros: Livro[]) => this.updateTabela.emit(this.livros = livros));
  }

  pesquisarLivro(){
    if(this.buscarLivro.valid){
      if(this.checkbox1){
        this.livroService.getByTitulo(this.buscarLivro.value).subscribe((livros: Livro[]) => {this.updateTabela.emit(this.livros = livros)
        this.pesquisadoTabela.emit(this.pesquisado = true)}
        ,error => this.livros = []);
      }
      else if(this.checkbox2)
        this.livroService.getByAutor(this.buscarLivro.value).subscribe((livros: Livro[]) => {this.updateTabela.emit(this.livros = livros)
        this.pesquisadoTabela.emit(this.pesquisado = true)}
        ,error => this.livros = []);
    }else{
      alert("É necessário informar um livro ou um autor!");
    }    
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
