import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { VerificarPermissoes } from '../functions/verificarPermissoes';

@Injectable()
export class ModulosGuard implements CanActivateChild {

  constructor(
    private router: Router,
    private loginService: LoginService
  ){}

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if(typeof childRoute.data['roles'] !== 'undefined' && childRoute.data['roles'].length){
      const rolesRota = childRoute.data['roles'];
      const usuarioLogado = this.loginService.usuarioLogado();
      const role = usuarioLogado?.perfil;

      console.log('child:' + childRoute);

      return new Observable<boolean>(subscriber => {
        if(!VerificarPermissoes.temPermissao(rolesRota, role!)){
          subscriber.next(false);
          this.router.navigate(['/acesso-negado']);
        }
        else{
          subscriber.next(true);
        }
      });
    }

    return new Observable<boolean>(subscriber => subscriber.next(true));
  }

}
