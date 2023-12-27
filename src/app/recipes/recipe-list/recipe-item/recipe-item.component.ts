import {Component, Input, OnInit} from '@angular/core';
import {RecipeService} from "../../../service/recipe.service";
import {Recipe} from "../../recipe.model";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-recipe-item', templateUrl: './recipe-item.component.html', styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index:number;

  constructor(private recipeService: RecipeService,private activeRoute:ActivatedRoute) {}

  ngOnInit(): void {

  }



}
