import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../../service/shoppingList.service";
import {FormsModule, NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit ,OnDestroy{

 @Output() inputIngredientDetails=new EventEmitter<Ingredient>();
 @ViewChild("f") form:NgForm;
  isEditMode=false;
  selectIndex=-1;
  subscription:Subscription;

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {

   this.subscription=this.shoppingListService.shoppingEditing.subscribe((index:number)=>{
            this.selectIndex=index;
            this.isEditMode=true;
            const editedItem=this.shoppingListService.getIngredient(index);
            this.form.setValue({
              name:editedItem.name,
              amount:editedItem.amount
            });
    });
  }
  onClear(){
    this.isEditMode=false;
    this.form.reset();
  }
  onSubmit(ref:NgForm) {
    let value=ref.value;
    if(this.isEditMode){
      this.shoppingListService.editIngredient(this.selectIndex,new Ingredient(value.name,value.amount));
    }else{
    this.shoppingListService.addIngredient(new Ingredient(value.name,value.amount));
    }
    this.isEditMode=false;
    this.form.reset();
    console.log(value);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.selectIndex);
    this.onClear();
  }
}
