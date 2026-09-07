// // create a  function for greeting  a user
// function greetUser(name:string):string{
//    return `good morning ${name}`;
// }

// let userName:string = "richard";
// console.log(greetUser(userName));



// let  value  : unknown  = " hiii this  my room";
//  let  text  = value ;
// //  console.log(text.toUpperCase());
// console.log((text ));



//  let name :  any = " richard";
//  let fullName  = name ;
//  console.log(fullName.toUpperCase());



 class User{
   name: string;
   companayName: string;

   constructor(name:string,companyName:string){
    this.name = name;
    this.companayName = companyName;
   }

 }

 const user = new User("richard","google");
//  user.name = "richard";
//  user.companayName = "google";
//  console.log(user.name);
//  console.log(user.companayName);



