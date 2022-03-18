import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes : Recipe[] = [
    new Recipe('Roast chicken','Chicken with chile-basil',
    'https://static.onecms.io/wp-content/uploads/sites/9/2021/02/12/roast-chicken-with-chile-basil-vinaigrette-charred-broccoli-potatoes-FT-RECIPE0321.jpg')
    ,
    new Recipe('Roast chicken','Chicken with chile-basil',
    'https://static.onecms.io/wp-content/uploads/sites/9/2021/02/12/roast-chicken-with-chile-basil-vinaigrette-charred-broccoli-potatoes-FT-RECIPE0321.jpg')
  ];
  constructor() { 
    console.log('Lenght: '+this.recipes.length);
  }

  ngOnInit(): void {
  }

}
