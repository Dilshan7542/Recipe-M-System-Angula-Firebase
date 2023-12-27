import {NgModule} from "@angular/core";
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations:[
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports:[
    SharedModule, //My SharedModule had a CommonModule
    RouterModule.forChild([ {path: "shopping",component: ShoppingListComponent}]), // single line route
    FormsModule
  ]
})
export class ShoppingModule {}
