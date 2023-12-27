import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import * as http from "http";
import {RecipeService} from "./recipe.service";
import {exhaustMap, map, take, tap} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient,private recipeService:RecipeService,private authService:AuthService) { }
  saveRecipe(recipe:Recipe){
   return this.http.post<Recipe>("https://ng-course-recipe-book-90e97-default-rtdb.firebaseio.com/recipe.json",recipe);
  }
  updateRecipe(recipe:Recipe){
    return this.http.put<Recipe>("https://ng-course-recipe-book-90e97-default-rtdb.firebaseio.com/recipe.json",recipe);
  }
  getAllRecipe(){
    return this.http.get<Recipe[]>("https://ng-course-recipe-book-90e97-default-rtdb.firebaseio.com/recipe.json")
      .pipe(map(resp=>{
        console.log(resp);
        let newAr:Recipe[]=[];
        for (let key in resp) {
          newAr.push({...resp[key],id:key})
        }
        return newAr;
      }),tap(resp=>{
        for (let recipe of resp) {
          this.recipeService.addRecipe(recipe);
        }
      }));
  }
}
