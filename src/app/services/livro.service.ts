import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Livro } from '../models/Livro';
import { CriarLivroDto } from '../models/CriarLivroDto';
import { AutorLivroDto } from '../models/AutorLivroDto';
import { AtualizarLivroDto } from '../models/AtualizarLivroDto';


@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private url = "Livro";

  constructor(private http: HttpClient) { }

  public getLivros() : Observable<Livro[]>{
    return this.http.get<Livro[]>(`${environment.apiUrl}/${this.url}`);
  }

  public async updateLivro(livro: AtualizarLivroDto) : Promise<Observable<Livro>>{
    return this.http.put<Livro>(`${environment.apiUrl}/${this.url}`, livro);
  }

  public createLivro(livro: CriarLivroDto) : Observable<Livro[]>{
    return this.http.post<Livro[]>(`${environment.apiUrl}/${this.url}`, livro);
  }

  public deleteLivro(livro: Livro) : Observable<Livro[]>{
    return this.http.delete<Livro[]>(`${environment.apiUrl}/${this.url}/${livro.id}`);
  }

  public apagarAutorLivro(autorLivro:AutorLivroDto) : Observable<Livro>{
    return this.http.post<Livro>(`${environment.apiUrl}/${this.url}/${"ApagarAutor"}`, autorLivro);
  }
}
