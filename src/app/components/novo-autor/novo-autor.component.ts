import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Autor } from 'src/app/models/Autor';
import { AutorDto } from 'src/app/models/AutorDto';
import { CriarAutorDto } from 'src/app/models/CriarAutorDto';
import { Livro } from 'src/app/models/Livro';
import { AutorService } from 'src/app/services/autor.service';

@Component({
  selector: 'app-novo-autor',
  templateUrl: './novo-autor.component.html',
  styleUrls: ['./novo-autor.component.scss']
})
export class NovoAutorComponent implements OnInit {
  @Input() autor?: AutorDto;
  @Output() newAutorEvent = new EventEmitter<Autor>();

  constructor(private autorService: AutorService) { }

  ngOnInit(): void {
  }

  async criarNovoAutor(autorRecebe: AutorDto){
    let autor = new CriarAutorDto
    autor.nome = autorRecebe.nome;
    (await this.autorService.createAutor(autor)).subscribe((autor: Autor) => this.newAutorEvent.emit(autor));
  }
}
