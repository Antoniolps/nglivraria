import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabelaComponent } from "./components/tabela/tabela.component";
import { EditarLivroComponent } from './components/editar-livro/editar-livro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CriaLivroComponent } from './components/cria-livro/cria-livro.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
    declarations: [
        AppComponent,
        TabelaComponent,
        EditarLivroComponent,
        CriaLivroComponent,
        HomeComponent,
        HeaderComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AppModule { }
