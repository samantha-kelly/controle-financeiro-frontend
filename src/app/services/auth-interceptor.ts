import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {

    if (req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
        return next(req);
    } else {

        const authToken = inject(AuthService).getToken();

        const reqWithHeader = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${authToken}`),
        });
        
        return next(reqWithHeader);
    }
}