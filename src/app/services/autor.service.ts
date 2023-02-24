import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { AtualizarAutorDto } from '../models/AtulizarAutorDto';
import { Autor } from '../models/Autor';
import { CriarAutorDto } from '../models/CriarAutorDto';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  private url = "Autor";

  constructor(private http: HttpClient) { }

  public async createAutor(autor: CriarAutorDto):Promise<Observable<Autor>>{
    return this.http.post<Autor>(`${environment.apiUrl}/${this.url}`, autor);
  }

  public async updateAutor(autor: AtualizarAutorDto):Promise<Observable<Autor>>{
    return this.http.put<Autor>(`${environment.apiUrl}/${this.url}`, autor);
  }

  public deleteAutor(autor: Autor) : Observable<Autor[]>{
    return this.http.delete<Autor[]>(`${environment.apiUrl}/${this.url}/${autor.id}`);
  }
}
