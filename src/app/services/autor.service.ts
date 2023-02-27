import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Livro } from '../models/Livro';
import { Autor } from '../models/Autor';
import { CriarAutorDto } from '../models/CriarAutorDto';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  private url = "Autor";

  constructor(private http: HttpClient) { }

  public createAutor(autor: CriarAutorDto): Observable<Livro[]>{
    return this.http.post<Livro[]>(`${environment.apiUrl}/${this.url}`, autor);
  }

  public updateAutor(autor: Autor): Observable<Livro[]>{
    return this.http.put<Livro[]>(`${environment.apiUrl}/${this.url}`, autor);
  }

  public deleteAutor(autor: Autor) : Observable<Livro[]>{
    return this.http.delete<Livro[]>(`${environment.apiUrl}/${this.url}/${autor.id}`);
  }

  public createAutorLivro(criarAutorDto : CriarAutorDto) : Observable<Livro[]>{
    return this.http.post<Livro[]>(`${environment.apiUrl}/${this.url}`, criarAutorDto);
  }
}
