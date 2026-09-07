
// response interface
interface User{
    userid: number
    name:String;
    age: number;
    image: string;
    modileNo : number
}
// req interaface

interface reqformate{
    userid: number 

}

const  users = [ {userid:1,name:"vivek",age:22,image : "fnjv",modilNo:8595661099},{userid:2,name:"abhishek",age:22,image : "fnjv",modilNo:8595661099},{userid:3,name:"rahul",age:22,image : "fnjv",modilNo:8595661099},{userid:4,name:"rohit",age:22,image : "fnjv",modilNo:8595661099}]

console.log(users[1])
// create a function for fetch a user 

function fechUser(id:number):User{

    const idf = id;
    const result = users[idf];


    return result;


    
}

let main= fetch(1)

