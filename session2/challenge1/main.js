let orders = [
  { id: 1, status: "valid", stockAvailable: true, amount: 500 },
  { id: 2, status: "cancelled", stockAvailable: true, amount: 300 },
  { id: 3, status: "valid", stockAvailable: false, amount: 700 },
  { id: 4, status: "valid", stockAvailable: true, amount: 900 },
  { id: 5, status: "invalid", stockAvailable: true, amount: 200 },
  { id: 6, status: "valid", stockAvailable: false, amount: 600 },
  { id: 7, status: "valid", stockAvailable: false, amount: 400 }
];
let totalRevenue = 0;
let successfulOrders = 0;
let processedOrders = 0;
let skippedInRow = 0;
let stockFailures = 0;
let message = "Completed";
for (let i = 0; i < orders.length; i++) {
    if (orders[i].status == "cancelled" || orders[i].status == "invalid") {
        skippedInRow++;
        if (skippedInRow == 3) {
            message = "System stopped due to critical failure";
            break;
        }
        continue;
    }
    if (orders[i].stockAvailable == false) {
        skippedInRow++;
        stockFailures++;
        if (skippedInRow == 3 || stockFailures == 3) {
            message = "System stopped due to critical failure";
            break;
        }
        continue;
    }
    totalRevenue += orders[i].amount;
    successfulOrders++;
    processedOrders++;
    skippedInRow = 0;}

console.log("Total Revenue:", totalRevenue);
console.log("Successful Orders:", successfulOrders);
console.log("Processed Orders:", processedOrders);
console.log("Message:", message);