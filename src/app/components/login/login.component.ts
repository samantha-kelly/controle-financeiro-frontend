import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginService } from '../../services/login.service';
import { MessageService } from '../../services/message.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  loginData = { login: '', password: '' };

  constructor(private loginService: LoginService, private router: Router, private messageService: MessageService, private authService: AuthService) { }

  login() {
    this.loginService.login(this.loginData).subscribe(
      {
        next: (response: any) => {
          console.log('Login bem-sucedido:', response);

          localStorage.setItem('jwt-token', response.token);

          let user = this.authService.getUser();

          this.messageService.showMessage(`Bem Vindo, ${user}! `, 'Fechar');
          this.router.navigate(['/home']);
        }
      }
    );
  }

  register() {
    this.router.navigate(['/register']);
  }
}
