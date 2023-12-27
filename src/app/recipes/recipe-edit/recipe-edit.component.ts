import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../../service/recipe.service";
import {DataStorageService} from "../../service/data-storage.service";
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  isEditMode=false;
  index:number;
  recipeForm:FormGroup;
  constructor(private activatedRoute:ActivatedRoute,private recipeService:RecipeService,private router:Router,private dataStorage:DataStorageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param:Params)=>{
        this.index= +param['id'];
        this.isEditMode= param['id'] != null;
      this.onInitFrom();
    })
  }
  get recipeControl(){
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
  onInitFrom(){
    let recipeName="";
    let recipeDesc="";
    let recipeImagePath="";
    let recipeIngredients=new FormArray([]);
    if(this.isEditMode){
    let recipe = this.recipeService.searchRecipe(this.index);
    recipeName=recipe.name;
    recipeDesc=recipe.description;
    recipeImagePath=recipe.imagePath;
    if(recipe['ingredients']){
      for (let ingredient of recipe.ingredients) {
        recipeIngredients.push(new FormGroup({
            name:new FormControl(ingredient.name,Validators.required),
            amount:new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
      }
    }

    }
      this.recipeForm=new FormGroup<any>({
        name:new FormControl(recipeName,Validators.required),
        description:new FormControl(recipeDesc,Validators.required),
        imagePath:new FormControl(recipeImagePath,Validators.required),
        ingredients:recipeIngredients
      });
  }

  addOnIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      name:new FormControl(null,Validators.required),
      amount:new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onRemoveIngredient(index:number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }


  onSubmit() {
    console.log("asdasdasd");
    if(!this.isEditMode){
      this.dataStorage.saveRecipe(this.recipeForm.value).subscribe(resp=>{
      this.recipeService.addRecipe(this.recipeForm.value);
      });

    }else{
      this.dataStorage.updateRecipe(this.recipeForm.value).subscribe(resp=>{
      this.recipeService.updateRecipe(this.index,this.recipeForm.value);
      });
    }
    this.isEditMode=false;
    this.recipeForm.reset();
  }

  onCancel() {
      this.router.navigate(['../'],{relativeTo:this.activatedRoute});
  }
}
