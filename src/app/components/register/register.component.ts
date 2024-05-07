import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerData = { login: '', password: '', role: '' };

  constructor(private registerService: RegisterService, private router: Router, private messageService: MessageService) { }

  register() {

    //TODO: Implementar diferença entre perfis
    this.registerData.role = 'ADMIN';

    this.registerService.register(this.registerData).subscribe(
      {
        next: (response: any) => {
          console.log('Registro bem-sucedido:', response);

          this.messageService.showMessage('Registro bem sucedido!', 'Fechar');
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
