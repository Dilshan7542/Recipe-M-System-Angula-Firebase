import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';

import { Recipe } from '../recipe.model';
import {RecipeService} from "../../service/recipe.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit ,OnDestroy{
  recipes: Recipe[] = [];
  subscription:Subscription;

  constructor(private recipeService:RecipeService) { }

  ngOnInit() {
   this.subscription= this.recipeService.changeRecipe.subscribe((recipes:Recipe[])=>{
        this.recipes=recipes;
    });
    this.recipes=this.recipeService.getRecipe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
