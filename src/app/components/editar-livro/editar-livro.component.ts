import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Autor } from 'src/app/models/Autor';
import { AutorLivroDto } from 'src/app/models/AutorLivroDto';
import { Livro } from 'src/app/models/Livro';
import { AutorService } from 'src/app/services/autor.service';
import { LivroService } from 'src/app/services/livro.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-livro',
  templateUrl: './editar-livro.component.html',
  styleUrls: ['./editar-livro.component.scss']
})
export class EditarLivroComponent implements OnInit {
  @Input() livro?: Livro;
  @Input() autor!: Autor;
  @Output() updateLivro = new EventEmitter<Livro>();
  @Output() updateTabela = new EventEmitter<Livro[]>();

  refalso: boolean = false;
  editarFalso: boolean = false;
  livroForm: FormGroup;
  autorForm: FormGroup;
  editarAutorForm: FormGroup;

  constructor(private livroService: LivroService, private autorService: AutorService, private fb: FormBuilder) {
    this.livroForm = this.fb.group({
      titulo: ['', [Validators.required]],
      subTitulo: [''],
      resumo: [''],
      qtdPaginas: [Number, [Validators.required]],
      dataPublicacao: [Date, [Validators.required]],
      editora: ['', [Validators.required]],
      edicao: [Number]
    })

    this.autorForm = this.fb.group({
      nome: ['', [Validators.required]]
    })

    this.editarAutorForm = this.fb.group({
      nome: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  atualizarLivro(){
    const dados = {
      id: this.livro!.id,
      ...this.livroForm.value
    };
    if(this.livroForm.valid)
      this.livroService.updateLivro(dados).subscribe((livros: Livro[]) => {
        this.updateTabela.emit(livros)
        if(this.livro != null)
          this.livroService.getLivroById(this.livro).subscribe((livro : Livro) => {this.updateLivro.emit(this.livro = livro)}
          ,error => alert("Verifique os campos e tente novamente!"));
      });
    else 
      alert("Verifique os campos obrigatórios!")
  }
  

  deletarAutor(autor: Autor, livro : Livro){
    let desacociar = new AutorLivroDto
    desacociar.idAutor = autor.id.toString();
    desacociar.idLivro = livro.id.toString();
    this.livroService.apagarAutorLivro(desacociar).subscribe((livros : Livro[]) => {
      this.updateTabela.emit(livros)
      if(this.livro != null)
        this.livroService.getLivroById(this.livro).subscribe((livro : Livro) => this.updateLivro.emit(this.livro = livro));
    });
  }

  criarNovoAutor(){
    const dados = { 
      idLivro: this.livro!.id.toString(),
      ...this.autorForm.value
    }
    if(this.autorForm.valid)
      this.autorService.createAutorLivro(dados).subscribe((livros : Livro[]) => {
        this.updateTabela.emit(livros)
        if(this.livro != null)
          this.livroService.getLivroById(this.livro).subscribe((livro : Livro) => this.updateLivro.emit(this.livro = livro));
      });
    else
      alert("Verifique os campos obrigatórios!")

    this.refalso = false;
  }

  atualizarAutor(){
    const dados = { 
      id: this.autor!.id.toString(),
      ...this.editarAutorForm.value
    }

    if(this.editarAutorForm.valid){
      this.autorService.updateAutor(dados).subscribe((livros: Livro[]) => {
        this.updateTabela.emit(livros)
        if(this.livro != null)
          this.livroService.getLivroById(this.livro).subscribe((livro : Livro) => this.updateLivro.emit(this.livro = livro));
      });
      this.editarFalso = false;
    }
    else
      alert("Verifique os campos obrigatórios!")
    
  }

  editarAutor(autor: Autor){
    this.editarFalso = true;
    this.refalso = false;
    this.autor = autor;
  }
  
  novoAutor() {
    this.refalso = true;
    this.editarFalso = false;
  }
}
