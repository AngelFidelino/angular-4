import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import {RecipeService} from '../recipe.service';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode: boolean = false;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params)=>{
        this.id = +params['id'];
        this.editMode = params['id'] !== undefined;
        this.initForm();
      }
    );

    
  }
  initForm(){
    let recipe:Recipe = new Recipe('','','',[]);;
    
    if(this.editMode){
      recipe = this.recipeService.getRecipe(this.id);
    }
    
    this.form= new FormGroup({
      'name' : new FormControl(recipe.name, Validators.required),
      'description' : new FormControl(recipe.description, Validators.required),
      'imagePath' : new FormControl(recipe.imagePath, Validators.required),
      ingredients: this.createIngredientArray(recipe.ingredients)
    });
  }

  createIngredientArray(ingredients: Ingredient[]) : FormArray{
    let array: FormArray = new FormArray([]);
    console.log(ingredients);
    if(ingredients){
      ingredients.forEach((i)=>{
        array.push(new FormGroup({
          'name': new FormControl(i.name, Validators.required),
          'amount':new FormControl(i.amount,[
            Validators.required,
            Validators.pattern(/^[0-9]+$/)
          ])
        }));
      });
     }
     return array;
  }

  get ingredients(){
    return (<FormArray>this.form.get('ingredients')).controls;
  }
  onSubmit(){
    console.log(this.form.value);
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.form.value);
    }else{
      this.recipeService.addRecipe(this.form.value);
    }
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  addIngredient(){
    (<FormArray>this.form.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[0-9]+$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.form.get('ingredients')).removeAt(index);
    //this.recipeService.deleteIngredientInRecipe(this.id,indexIngredient);
  }
}
