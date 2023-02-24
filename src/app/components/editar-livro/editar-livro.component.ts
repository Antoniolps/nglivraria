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
  @Output() livroOut = new EventEmitter<Livro>();
  @Output() autorOut = new EventEmitter<Autor>();
  @Output() autorOut2 = new EventEmitter<Autor[]>();

  refalso: boolean = false;
  livroForm: FormGroup;
  autorForm: FormGroup;

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
  }

  ngOnInit(): void {
  }

  async atualizarLivro(){
    const dados = {
      id: this.livro!.id,
      ...this.livroForm.value
    };
    if(this.livroForm.valid)
      (await this.livroService.updateLivro(dados)).subscribe((livro: Livro) => this.livroOut.emit(livro));
    else 
      alert("Preasdasd")
  }
  

  deletarAutor(autor: Autor, livro : Livro){
    let desacociar = new AutorLivroDto
    desacociar.idAutor = autor.id.toString();
    desacociar.idLivro = livro.id.toString();
    this.livroService.apagarAutorLivro(desacociar).subscribe((livro : Livro) => this.livroOut.emit(livro));
  }

  async criarNovoAutor(){
    const dados = { 
      idLivro: this.livro!.id.toString(),
      ...this.autorForm.value
    }
    if(this.autorForm.valid)
      this.autorService.createAutorLivro(dados).subscribe();
    else
      alert("assad")
  }
  
  novoAutor() {
    this.refalso = true;
  }
}
