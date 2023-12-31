import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {exhaustMap, Observable, take} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../auth/auth.service";

@Injectable({providedIn:"root"})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService:AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return  this.authService.userEmit.pipe(take(1),exhaustMap(user=>{
      if(!user){
        return next.handle(req);
      }
        let httpRequest = req.clone({params:new HttpParams().set("auth",user.token)});
    return next.handle(httpRequest);
    }));
  }

}
