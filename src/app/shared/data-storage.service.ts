import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import { Recipe } from "../recipes/recipe.model";
import {RecipeService} from '../recipes/recipe.service'
@Injectable({providedIn: 'root'})
export class DataStorageService{
    constructor(private recipeService: RecipeService, private http: HttpClient, private authService: AuthService){}

    save(){
        //Some params are added by interceptors
        const recipes: Recipe[] = this.recipeService.getRecipes();
        return this.http.put('https://my-project-1508961738554-default-rtdb.firebaseio.com/recipes.json',recipes)
        .subscribe(dataResponse=>{
            //console.log(dataResponse);
        });
    }

    getRecipes() { 
        //Some params are added by interceptors
        return this.http.get<Recipe[]>('https://my-project-1508961738554-default-rtdb.firebaseio.com/recipes.json')
        .pipe(tap(recipes=>{
            this.recipeService.setRecipes(recipes);   
        }));
        /*
        let user: User=null;
        this.authService.user.pipe(take(1)).subscribe(u=>{
            user = u;
        });
        return this.http.get<Recipe[]>('https://my-project-1508961738554-default-rtdb.firebaseio.com/recipes.json',{
            params: new HttpParams().set('auth',user.token)
        }).pipe(tap(recipes=>{
            this.recipeService.setRecipes(recipes);   
        }));
        */
        /*.subscribe(dataResponse=>{
            //  this.recipes = dataResponse;
            this.recipeService.setRecipes(dataResponse);
        });*/
    }
}