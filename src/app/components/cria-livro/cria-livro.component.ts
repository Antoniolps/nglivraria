import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Autor } from 'src/app/models/Autor';
import { Livro } from 'src/app/models/Livro';
import { LivroDto } from 'src/app/models/LivroDto';
import { LivroService } from 'src/app/services/livro.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-cria-livro',
  templateUrl: './cria-livro.component.html',
  styleUrls: ['./cria-livro.component.scss']
})

export class CriaLivroComponent implements OnInit {
  @Input() livro?: LivroDto;
  @Output() updateTabela = new EventEmitter<Livro[]>();
  @Output() fechar = new EventEmitter<void>();
  livroForm : FormGroup;
  alertP: boolean = false;

  constructor(private livroService:LivroService, private fb: FormBuilder) { 
    this.livroForm = this.fb.group({
      titulo: ['', [Validators.required]],
      subTitulo: [''],
      resumo: [''],
      qtdPaginas: [Number, [Validators.required]],
      dataPublicacao: [Date, [Validators.required]],
      editora: ['', [Validators.required]],
      edicao: [Number],
      autorNome: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {}

  async criarAutorLivro(){
    if(this.livroForm.valid)
      this.livroService.createLivro(this.livroForm.value).subscribe((result: Livro[]) => {this.updateTabela.emit(result)
      this.fechar.emit()}
      ,error => alert("Verifique os campos e tente novamente"));
    else
      this.alertP = true;
  }

}
