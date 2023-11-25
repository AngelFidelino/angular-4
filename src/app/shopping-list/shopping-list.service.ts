import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";
@Injectable({providedIn:'root'})
export class ShoppingListService{
    
    updateIngredients = new Subject<Ingredient[] >();
    editingItemSubject = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10)
      ];
    
    getIngredienst(){
        return this.ingredients.slice();
    }
    getIngredienByIndex(index:number){
        return this.ingredients[index];
    }

    addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.updateIngredients.next(this.ingredients.slice());
    }
    updateIngredient(index:number, ingredient:Ingredient){
        this.ingredients[index]=ingredient;
        this.updateIngredients.next(this.ingredients.slice());
    }
    deleteIngredient(index:number){
        //delete this.ingredients[index];
        this.ingredients.splice(index,1);
        this.updateIngredients.next(this.ingredients.slice());
    }
    addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        //this.updateIngredients.emit(this.ingredients.slice());
    }
}