import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "../recipes/recipe.model";
import {Observable} from "rxjs";
import {DataStorageService} from "./data-storage.service";
import {RecipeService} from "./recipe.service";


@Injectable({providedIn:"root"})
export class RecipeResolverService implements Resolve<Recipe[]>{

  constructor(private dataStorage:DataStorageService,private recipeService:RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    if(this.recipeService.getRecipe().length===0){
    return this.dataStorage.getAllRecipe();
    }else{
      return null;
    }
  }
}
