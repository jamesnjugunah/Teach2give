
//1. Declare a variable age using let and assign it the value 25.
let age = 25;
//2. Declare a variable schoolName using const and assign it "Greenwood High".
const schoolName = "Greenwood High";
//3. Declare an empty array called studentsList.
let studentsList = [];
//4. What is the difference between let, const, and var when declaring variables?
//answ: let is block scoped, const is block scoped and cannot be reassigned, var is function scoped and can be reassigned.

//2. Naming Conventions
//Which of the following variable names is invalid?
//let $price = 100;
//let 1stPlace = "John";
//let _score = 89;
//let userName = "Alice";

//5.Why is the following variable name incorrect?
//const #taxRate = 0.16;
//answ: variable names cannot start with a special character.

//6.Rewrite this variable name to follow best practices:
let myVariableName = "JavaScript";

//3. Identifying Data Types
//What will be the output of the following?
console.log(typeof "Hello");//string
console.log(typeof 99);//number
console.log(typeof true);//boolean
console.log(typeof undefined);//undefined

//8.Identify the data types in this array:
let data = ["Kenya", 34, false, { country: "USA" }, null];//string, number, boolean, object, null

//9. How do you define a BigInt in JavaScript? Provide an example.
let bigInt = 1234567890123456789012345678901234567890n;

//4. Objects & Arrays
//11. Create an object person with properties name, age, and city.
let person = {
    name: "John",
    age: 25,
    city: "Nairobi"
};

//12. Add a new property email to the person object.
person.email = "jn394126@gmail.com";

//13. Declare an array fruits with three fruit names.
let fruits = ["apple", "banana", "mango"];

//14. Access the second item in the fruits array.
console.log(fruits[1]);

//5. Type Coercion
//15. What will be the output of the following?
console.log("5" + 2);//52
console.log("5" - 2);//3

//16. Convert the string "100" into a number.
let num = parseInt("100");
//17. Convert the number 50 into a string.
let num1=50
let str = num1.toString();

//18. What will be the result of this operation?
console.log(5 + true);//6