import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Recipe } from './recipes/recipe.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.authService.autoLogin();
  }
  set names(s:string){
    
  }
  get name(){
    return "Testing haha";
  }
  
}
