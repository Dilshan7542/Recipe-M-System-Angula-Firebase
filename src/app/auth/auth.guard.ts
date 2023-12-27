import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, Observable, take} from "rxjs";

import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn:"root"
})
export class AuthGuard implements CanActivate{

  constructor(private authService:AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("fire auth-guard");
   return this.authService.userEmit.pipe(
     take(1), // run one time and unsubscribe
     map(user=> user!==null));
  }

}
