export class User{

  constructor(public id:string,public email:string,private _token:string,private _tokenExpiration:Date) {
  }
  get token(){
   if(!this._token || new Date() >this._tokenExpiration){
     return  null;
   }else{
     return this._token;
   }
  }
}
