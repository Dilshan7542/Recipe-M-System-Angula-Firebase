import {Recipe} from "../recipes/recipe.model";
import {EventEmitter, Injectable, Output} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shoppingList.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService{
  changeRecipe=new Subject<Recipe[]>();

  constructor(private slService:ShoppingListService) {}
   private  recipes: Recipe[] =[];
     /* private  recipes: Recipe[] = [
        new Recipe(

          'Waffel'
          , 'This is Waffels',
          'https://healthyfitnessmeals.com/wp-content/uploads/2018/06/instagram-In-Stream_Square___protein-waffles-3-500x500.jpg',
          [
            new Ingredient("Egg",5),
            new Ingredient("Fresh Milk",2),
            new Ingredient("Butter-500g",1),
          ]
          ),
        new Recipe('Burger', 'This is Burger ', 'https://maggiejs.ca/wp-content/uploads/2017/01/BBQ-Bacon-King-Burger-%C2%A9-2017-Burger-King.jpg',[
          new Ingredient("Egg",1),
          new Ingredient("Bun",1),
          new Ingredient("cheese",1),
        ])
      ];*/
getRecipe(){
  return this.recipes.slice();
}
addToSelectRecipeIngredient(ingredient:Ingredient[]){
  this.slService.addIngredientList(ingredient);
}
  searchRecipe(id:number):Recipe{
   return this.recipes[id];
  }
  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.changeRecipe.next(this.recipes.slice());
  }
  updateRecipe(index:number,recipe:Recipe){
    console.log(recipe);
    this.recipes[index]=recipe;
    this.changeRecipe.next(this.recipes.slice());
  }
  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.changeRecipe.next(this.recipes.slice());
  }

}
