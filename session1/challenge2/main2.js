let customerName = prompt("enter your name");
let cat = prompt("enter product category (elec/books/clothes)");
let price = Number(prompt("enter product price "));
let qu = Number(prompt("enter your quantity "));
let coupon = prompt("enter coupon ");
let payment = prompt("enter payment (visa/cash/wallet)");
let subtotal = price * qu;
let catdiscount = 0;
let paymentcatdiscount = 0;
let couponcatdiscount=0;
if (cat === "elec") {
    catdiscount = subtotal * 0.10
}
else if (cat === "cltothes") {
    catdiscount = subtotal * 0.12
}
else if (cat === "books")
{
    catdiscount = subtotal * 0.05
}
else {
    catdiscount = 0;
}

if (payment === "visa")
{
    paymentdiscount = subtotal * 0.05;
}
else if (payment === "wallet") {
    paymentdiscount = subtotal * 0.03;
}
else  {
    paymentdiscount = 0;
}

if (coupon === "1010")
{
    coupondiscount =subtotal*0.50;
}
else {

 coupondiscount = 0;
 
}

let totaldiscount =catdiscount+paymentdiscount+coupondiscount;
let afterdiscount = subtotal- totaldiscount;
let vat = afterdiscount* 0.14;
let finaltotal= vat + afterdiscount

console.log("Customer Name: " + customerName);
console.log("Category: " + cat);
console.log("Price: " + price);
console.log("Quantity: " + qu);
console.log("Subtotal: " + subtotal);
console.log("Category Discount: " + catdiscount);
console.log("Coupon Discount: " + coupondiscount);
console.log("Payment Discount: " + paymentdiscount);
console.log("VAT: " + vat);
console.log("Final Price: " + finaltotal);

alert(
"Customer: " + customerName +
"\nSubtotal: " + subtotal +
"\nCategory Discount: " + catdiscount +
"\nCoupon Discount: " + coupondiscount +
"\nPayment Discount: " + paymentdiscount +
"\nVAT: " + vat +
"\nFinal Price: " + finaltotal
);


