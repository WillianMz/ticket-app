import { LoginService } from 'src/app/services/login.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(
        private loginService: LoginService
    ){}

    //MELHORAR
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.loginService.obterToken();
        let request: HttpRequest<any> = req;

        if(token && !this.loginService.tokenExpirado ()) {
            //O request é imutavel, ou seja não é possivel mudar anda
            //Faço o clone para conseguir mudar as propriedades
            //Passo o token de autenticacao no header
            request = req.clone({
                headers: request.headers.set('Authorization', `Bearer ${token}`)
            });
        }

        //retorno o request com o erro tratado
        return next.handle(request)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse){
        if(error.error instanceof ErrorEvent) {
            //Erro de client-side ou de rede
            console.error('Ocorreu um erro:', error.error.message);
        }
        else{
            //Erro retornado pelo backend
            console.error(
                `Cód.Erro ${error.status}` + 
                `Erro ${JSON.stringify(error.error)}`
            );
        }

        //retornar um observable com uma mensagem amigavel
        return throwError(() => new Error('Ocorreu um erro, tente novamente'));
    }
}