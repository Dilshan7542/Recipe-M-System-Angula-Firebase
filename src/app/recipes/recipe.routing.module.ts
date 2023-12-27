import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes.component";
import {AuthGuard} from "../auth/auth.guard";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeResolverService} from "../service/recipe-resolver.service";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";


const route:Routes=[
  {path:"",component:RecipesComponent,canActivate:[AuthGuard],
    children:[

      {path:"list",component:RecipeListComponent},
      {path:"detail/new",component:RecipeEditComponent,resolve:[RecipeResolverService]},
      {path:"detail/:id",component:RecipeDetailComponent,resolve:[RecipeResolverService]},
      {path:"detail/:id/edit",component:RecipeEditComponent},

    ],resolve:[RecipeResolverService]},
];
@NgModule({
  imports:[RouterModule.forChild(route)],
  exports:[RouterModule]
})
export class RecipeRoutingModule{

}
