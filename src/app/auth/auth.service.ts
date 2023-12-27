import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Auth} from "./Auth";
import {BehaviorSubject, catchError, map, Subject, tap, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";
export interface AuthResponseData{
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
  registered?:boolean;
}
@Injectable({
  providedIn:"root"
})
export class AuthService{
  key="AIzaSyC9cvOR0IQmrRXy7ZS9nszNg1XQQ_zrSaw";
  userEmit=new BehaviorSubject<User>(null);
  constructor(private http:HttpClient,private router:Router) {}
  signUp(auth:Auth){
   return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+this.key,auth)
     .pipe(catchError(error=>this.handlerError(error)),tap(resp=> this.handlerAuthentication(resp)));
  }
  login(auth:Auth){
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+this.key,auth)
      .pipe(catchError(error=>this.handlerError(error)),tap(resp => this.handlerAuthentication(resp)));
  }
  handlerAuthentication(authRes:AuthResponseData){
    const expirationDate=new Date(new Date().getTime()+ +authRes.expiresIn*1000);
    let user1 = new User(authRes.localId,authRes.email,authRes.idToken,expirationDate);
    this.userEmit.next(user1);
    localStorage.setItem("userData",JSON.stringify(user1));
  }
  autoLogin(){
    let auth:{
       id:string,
      email:string,
      _token:string,
      _tokenExpiration:Date
    } = JSON.parse(localStorage.getItem("userData"));
    if(!auth){
      this.logOut();
      return;
    }
    let user = new User(auth.id,auth.email,auth._token,auth._tokenExpiration);

    if (user.token) {
     this.userEmit.next(user);
    }else{
      console.log("is Here");
      this.logOut();
    }

  }
  logOut(){
    this.userEmit.next(null);
    localStorage.removeItem("userData");
    this.router.navigate(['/auth']);
  }
  private handlerError(error:HttpErrorResponse){
    console.log(error);
    let errMessage="Unknown Error Occurred!!";

    switch (error.error.error.message || error.error){
      case "EMAIL_EXISTS":
        errMessage="The email address is already in use by another account.";
        break;
      case "EMAIL_NOT_FOUND":
        errMessage="There is no user record corresponding to this identifier. The user may have been deleted";
        break;
      case "INVALID_PASSWORD":
        errMessage="The password is invalid or the user does not have a password.";
        break;
      case "INVALID_LOGIN_CREDENTIALS":
        errMessage="Invalid user name or password"
        break;
    }
    return throwError(errMessage);
  }
}
