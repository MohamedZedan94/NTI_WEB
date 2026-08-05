function secondFunction() {
  console.log("Inside secondFunction");
}

function firstFunction() {
  console.log("Inside firstFunction");
  secondFunction();
  console.log("Back in firstFunction");
}

console.log("Program starts");
firstFunction();
console.log("Program ends");