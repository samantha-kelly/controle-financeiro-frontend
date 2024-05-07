import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MessageService } from './message.service';

@Injectable({
    providedIn: 'root'
})
export class CustomErrorHandler implements ErrorHandler {


    constructor(
        private zone: NgZone,
        private messageService: MessageService,
        private router: Router,
        private authService: AuthService
    ) { }

    handleError(errorResponse: Error | HttpErrorResponse): void {

        // Log the error to the console.
        console.error(errorResponse);


        let message = '';

        if (errorResponse instanceof HttpErrorResponse) {
            switch (errorResponse.status) {
                case HttpStatusCode.BadRequest:
                    message = errorResponse.error?.message ? errorResponse.error.message : errorResponse.error;
                    break;
                case HttpStatusCode.Unauthorized:
                    message = 'Usuário não encontrado ou senha inválida.';
                    this.authService.removeToken();
                    this.zone.run(() => {
                        this.router.navigate(['/login']);
                    });
                    break;
                case HttpStatusCode.Forbidden:
                    message = 'Usuário não tem permissão para realizar essa operação.';
                    break;
                case HttpStatusCode.InternalServerError:
                    if (errorResponse.error.message == "Usuário não encontrado.") {
                        message = 'Usuário não encontrado ou senha inválida.';
                        this.authService.removeToken();
                        this.zone.run(() => {
                            this.router.navigate(['/login']);
                        });
                    } else {
                        message = 'Erro inesperado no servidor. Contate o administrador do sistema.';
                    }
                    break;
                case HttpStatusCode.ServiceUnavailable:
                    message = 'Servidor indisponível! Tente novamente mais tarde. Se o problema persistir contate o administrador do sistema.';
                    break;
            }
        } else {
            message = errorResponse.message;
        }

        this.zone.run(() => {
            this.messageService.showMessage(message, 'Fechar');
        });


    }
}