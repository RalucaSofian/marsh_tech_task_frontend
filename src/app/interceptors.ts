import { HttpErrorResponse, HttpHandlerFn, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, of } from "rxjs";
import { AuthService } from "./services/auth-service";


export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    const authService = inject(AuthService);
    const authToken = inject(AuthService).getJWT();
    const newReq = req.clone({
        headers: req.headers.append('Authorization', 'Bearer ' + authToken),
    });

    return next(newReq).pipe(
        catchError((error) => {
            if (error instanceof HttpErrorResponse && error.status === HttpStatusCode.Unauthorized) {
                authService.logout();
                return of();
            }
           throw error;
        }),
    );
}
