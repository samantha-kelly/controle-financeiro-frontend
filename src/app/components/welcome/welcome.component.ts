import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  usuario = '';


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.usuario = this.authService.getUser()
  }
}
