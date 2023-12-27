import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {RecipeService} from "./service/recipe.service";
import {ShoppingListService} from "./service/shoppingList.service";
import {AppRoutingModel} from "./app.routing.model";
import {NotFoundComponent} from './not-found/not-found.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptorService} from "./interceptor/auth-interceptor.service";
import {AuthComponent} from "./auth/auth.component";
import {RecipeModule} from "./recipes/recipe.module";
import {ShoppingModule} from "./shopping-list/shopping.module";
import {SharedModule} from "./shared/shared.module";
import {AuthModule} from "./auth/AuthModule";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    ],
  imports: [
    BrowserModule,
    AuthModule,
    ShoppingModule,
    ReactiveFormsModule,
    AppRoutingModel,
    HttpClientModule,
    SharedModule
  ],
  providers: [ShoppingListService, RecipeService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
