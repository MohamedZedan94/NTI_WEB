function getNumber() {
  return 7;
}

function squareNumber(number) {
  return number * number;
}

let number = getNumber();
let result = squareNumber(number);

console.log("Original number:", number);
console.log("Squared result:", result);