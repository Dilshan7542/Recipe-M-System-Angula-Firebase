import {NgModule} from "@angular/core";
import {PreloadAllModules, PreloadingStrategy, RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "./not-found/not-found.component";


const routes: Routes = [
  {path: "", redirectTo: "/auth", pathMatch: "full"},
 {path:"recipe",loadChildren:()=> import('./recipes/recipe.module').then(r=>r.RecipeModule)},
  {path:"auth",loadChildren:()=> import("./auth/AuthModule").then(r=>r.AuthModule)},
  {path: "not-found", component: NotFoundComponent},
  {path: "**",redirectTo: "/not-found"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})], exports: [RouterModule]
})
export class AppRoutingModel {
}
