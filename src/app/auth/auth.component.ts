import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent{
    isLoginMode=true;
    error = null;

    constructor(private authService: AuthService, private router: Router){}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode; 
    }
    onLogin(form: NgForm){
        const email = form.value.email;
        const pwd = form.value.password
        
        if(form.invalid){
           // return;
        }

        let authObs : Observable<AuthResponseData>;

        if(this.isLoginMode){
            authObs = this.authService.singIn(email,pwd);
        }else{
            authObs = this.authService.singUp(email,pwd);
            /*
            this.authService.singUp(email,pwd).subscribe((responseData)=>{
                console.log(responseData);
            }, (error)=>{
                console.log(error);
            });
            */
        }

        authObs.subscribe({
            next: (v) => {
                console.info('next');
                console.log(v);
                this.router.navigate(['/recipes']);
            },
            error:(e) => {
                console.info('error');
                console.error(e);
                this.error = e;
            },
            complete:() => {
                console.info('complete');
            } 
        });

        form.reset();
    }

    clearError(){
        this.error = null;
    }
}