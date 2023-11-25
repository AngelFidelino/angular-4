import { Component, OnDestroy, OnInit} from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styles:[
        `
        .greeting{
            color: red;
        }
        `]
})
export class HeaderComponent implements OnInit, OnDestroy{
    
    isAuthenticated: boolean = false;
    userSubscription = new Subscription;

    constructor(private dataStorageService: DataStorageService,private authService: AuthService){}
    
    ngOnInit(): void {
        this.userSubscription = this.authService.user.subscribe(user=>{
            this.isAuthenticated = !!user; // user ? true : false;
            console.log(!user);
            console.log(!!user);
        });
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    onSave(){
        this.dataStorageService.save();
    }
    onFetching(){
        this.dataStorageService.getRecipes().subscribe();
    }
    logout(){
        this.authService.logout();
    }
}