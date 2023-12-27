import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataStorageService} from "../service/data-storage.service";
import {RecipeService} from "../service/recipe.service";
import {map, tap} from "rxjs";
import {Recipe} from "../recipes/recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles:[`
    .active {
      background: rgba(115, 115, 227, 0.56) !important;
    }
  `]
})
export class HeaderComponent implements OnInit{
    isAuthenticated=false;

  constructor(private dataStorage:DataStorageService,private recipeService:RecipeService,private authService:AuthService) {
  }

  onSaveData() {

   /* this.dataStorage.saveRecipe().subscribe(resp=>{
      console.log(resp);
    });*/
  }

  fetchData() {
    this.dataStorage.getAllRecipe();
  }

  logOut() {
this.authService.logOut();
  }

  ngOnInit(): void {
    this.authService.userEmit.subscribe(user=>{
      this.isAuthenticated= !!user;
    });
  }
}
