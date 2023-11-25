import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  editMode:boolean=false;
  indexEditingItem:number;

  @ViewChild('form',{static: false}) form: NgForm;
  
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingListService.editingItemSubject.subscribe((index: number)=>{
      this.indexEditingItem = index;
      this.editMode = true;
      const ingredientSelected = this.shoppingListService.getIngredienByIndex(this.indexEditingItem);
      this.form.setValue({
        name:ingredientSelected.name,
        amount:ingredientSelected.amount
      });
    });
  }

  onSubmit(form: NgForm){
    const values = form.value;
    const ingredient = new Ingredient(values.name,values.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.indexEditingItem,ingredient);
    }else{
      this.shoppingListService.addIngredient(ingredient);
    }
    this.editMode=false;
    form.reset();
  }

  onClear(){
    this.editMode=false;
    this.form.reset();
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.indexEditingItem);
    this.onClear();
  }
}
