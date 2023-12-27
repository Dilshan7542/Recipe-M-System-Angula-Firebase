import {Component, ComponentFactoryResolver} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AlertComponent} from "../shared/alert/alert.component";


@Component({
  selector:"auth-component",
  styles:[`
  .mainDiv{
    display: flex;
    justify-content: center;
    align-items: end;
    height: 50vh;
  }
  `],
  templateUrl:"auth.component.html"
})
export class AuthComponent{
    isLoginMode=true;
    isLoadingMode=false;
    error:string=null;

  constructor(private authService:AuthService,
              private router:Router,
              private componentResolverFactory:ComponentFactoryResolver
  ) {
  }

  onSwitchMode() {
    this.isLoginMode=!this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
      if(!authForm.valid){
        return;
      }
      let authObs:Observable<AuthResponseData>;
    let value = authForm.value;
    this.isLoadingMode=true;
      if(this.isLoginMode){
     authObs=this.authService.login({email:value.email,password:value.pwd,returnSecureToken:true});
      }else{
   authObs=this.authService.signUp({email:value.email,password:value.pwd,returnSecureToken:true});
      }
      authObs.subscribe(resp=>{
          console.log(resp);
          this.router.navigate(['/recipe']);
        },error => {
          console.error(error);
          this.error=error;
        }).add(()=>{
        this.isLoadingMode=false;
      });
    authForm.reset();
  }
  login(){

  }
  errorHandler(){
    this.error=null;
  }
  showErrorAlert(message:string){
    let alertComponentComponentFactory = this.componentResolverFactory.resolveComponentFactory(AlertComponent);

  }
}
