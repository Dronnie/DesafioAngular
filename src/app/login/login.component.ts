import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  nome: string = '';
  senha: string = '';
  erroMsg: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.erroMsg = '';

    this.http.post('http://localhost:3001/login', {
      nome: this.nome,
      senha: this.senha
    }).subscribe({
      next: (res) => {
        // Login ok - redireciona
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.erroMsg = err.error?.message || 'Erro ao fazer login';
      }
    });
  }
}
