import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class ShoppingListService{
  shoppingListChange=new Subject<Ingredient[]>();
  shoppingEditing=new Subject<number>();
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  getShoppingList(){
    return this.ingredients.slice();
  }
  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    this.shoppingListChange.next(this.ingredients.slice());
  }
  addIngredientList(ingredientList:Ingredient[]){
    this.ingredients.push(...ingredientList);
    this.shoppingListChange.next(this.ingredients.slice());
  }
  getIngredient(index:number){
    return this.ingredients[index];
  }
  editIngredient(index:number,ingredient:Ingredient){
    this.ingredients[index]=ingredient;
    this.shoppingListChange.next(this.ingredients.slice());
  }
  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.shoppingListChange.next(this.ingredients.slice());
  }
}
