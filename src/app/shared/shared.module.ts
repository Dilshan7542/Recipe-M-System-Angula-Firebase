import {NgModule} from "@angular/core";
import {DropdownDirective} from "./dropdown.directive";
import {LoadingComponent} from "./loading/loading.component";
import {AlertComponent} from "./alert/alert.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations:[
    DropdownDirective,
    LoadingComponent,
    AlertComponent

  ],
  imports:[
    CommonModule
  ],
  exports:[
    CommonModule,
    DropdownDirective,
    LoadingComponent,
    AlertComponent
  ],
})
export class SharedModule{}
