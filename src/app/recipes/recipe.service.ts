import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({providedIn: 'root'})
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();
    //private recipes : Recipe[] = [];
    
    private recipes : Recipe[] = [
        new Recipe('Roast chicken',
        'Chicken with chile-basil',
        'https://static.onecms.io/wp-content/uploads/sites/9/2021/02/12/roast-chicken-with-chile-basil-vinaigrette-charred-broccoli-potatoes-FT-RECIPE0321.jpg',
        [
            new Ingredient('Chicken',1),
            new Ingredient('Chilli',3)
        ])
        ,
        new Recipe('Good Old Fashioned Pancakes',
        'This is a great recipe that I found in my Grandmas recipe book. Judging from the weathered look of this recipe card, this was a family favorite.',
        'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F02%2F16%2F21014-Good-old-Fashioned-Pancakes-mfs_001-1.jpg',
        [
            new Ingredient('Flour',1),
            new Ingredient('Honey',1)
        ])
      ];
   
    constructor(private shoppingListService: ShoppingListService){}

    getRecipe(index: number){
        return this.recipes[index];
    }
    getRecipes(){
        return this.recipes.slice();
    }
    
    addIngredientesToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
    }
    
    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe){
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
    //Deprecated
    deleteIngredientInRecipe(indexRecipe: number, indexIngredient: number){
        let recipeLocal = this.getRecipe(indexRecipe);
        recipeLocal.ingredients.splice(indexIngredient,1);
        console.log(recipeLocal.ingredients.length);
        this.updateRecipe(indexRecipe, recipeLocal);
    }
}