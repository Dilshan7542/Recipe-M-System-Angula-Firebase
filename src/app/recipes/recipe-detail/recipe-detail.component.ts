import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ShoppingListService} from "../../service/shoppingList.service";
import {RecipeService} from "../../service/recipe.service";
import {ActivatedRoute, Params, Route, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe:Recipe;
  index:number;
  constructor(private recipeService:RecipeService,private aCRouter:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.aCRouter.params.subscribe((param:Params)=>{
       this.index= +param['id'];
       this.selectedRecipe=this.recipeService.searchRecipe(this.index);
    });
  }


  onToShoppingList() {
    this.recipeService.addToSelectRecipeIngredient(this.selectedRecipe.ingredients);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.index);
    this.router.navigate(["/recipe"]);
  }
}
