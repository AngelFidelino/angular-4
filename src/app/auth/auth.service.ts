import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?: boolean
}

@Injectable({providedIn:'root'})
export class AuthService{
    user = new BehaviorSubject<User>(null);
    expirationTimer : any;
    constructor(private http : HttpClient, private router: Router){}

    SIGN_UP_URL: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=xxx';
    SIGN_IN_URL: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=xxx';
    
    singIn(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=xxx',{
            email: email, 
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handlerError),
        tap(this.handlerAuthentication));

        
    }

    singUp(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=xxx',{
            email: email, 
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handlerError),
        tap(this.handlerAuthentication));
    }

    private handlerAuthentication = (responseData)=>{
        const dateLocal = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
        const user = new User(responseData.email,responseData.localId,responseData.idToken,dateLocal);
        localStorage.setItem('userData', JSON.stringify(user));
        
        this.user.next(user);
        this.autoLogout(responseData.expiresIn * 1000);
    }

    private handlerError = function(error){
        let errorMessage='';
        switch(error.error.error.message){
            case 'EMAIL_EXISTS': {
                errorMessage='This email exists already';
            }
            case 'EMAIL_NOT_FOUND': {
                errorMessage='Email does not exist';
            }
            case 'INVALID_PASSWORD': {
                errorMessage='Password is not correct';
            }

        }
        return throwError(()=>new Error(errorMessage));
    }

    
    logout(){
        console.log('logging out...');
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.expirationTimer){
            clearTimeout(this.expirationTimer);
        }
        this.expirationTimer=null;
    }

    autoLogout(durationTimer: number){
        console.log('auto-logging out...');
        console.log(durationTimer);
        this.expirationTimer = setTimeout(()=>{
            this.logout();
        },durationTimer)
    } 

    autoLogin(){
        const userData:{
            email: string,
            expiresDate: string,
            id: string,
            idToken: string} = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        const user = new User(userData.email,userData.id,userData.idToken,new Date(userData.expiresDate));
        if(user.token){
            this.user.next(user);
            const timeRemaining = new Date(userData.expiresDate).getTime() - new Date().getTime();
            this.autoLogout(timeRemaining * 1000);
        }  
    }

}
