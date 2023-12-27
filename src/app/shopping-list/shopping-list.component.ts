import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import {ShoppingListService} from "../service/shoppingList.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit ,OnDestroy{
  ingredients: Ingredient[] = [];
  igChangeSub:Subscription;

  constructor(private shoppingList:ShoppingListService) { }

  ngOnInit() {
    this.ingredients=this.shoppingList.getShoppingList();
   this.igChangeSub=this.shoppingList.shoppingListChange.subscribe((ingredientList:Ingredient[])=>{
      this.ingredients=ingredientList;
    });


  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }


  onEditItem(index: number) {
    this.shoppingList.shoppingEditing.next(index);
  }
}
