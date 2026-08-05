let pin = "1122";
let balance = 5000;
let att = 0;
while (att < 3) {
    let enteredPin = prompt("Enter Your PIN:");
    if (enteredPin !== pin) {
        att++;
        console.log("Incorrect PIN.");
        if (att == 3) {
            console.log("Account Locked.");
        }
    } else {
        console.log("Welcome!");
        let operation = prompt("choose an operation: -- 1.withdraw -- 2.deposit -- 3.check balance -- 4.change pin");
        if (operation == "1") {
            let amount = Number(prompt("Enter amount to withdraw:"));
            if (amount <= 0) {
                console.log("Invalid amount.");
            } else if (amount > balance) {
                console.log("Insufficient balance.");
            } else {
                balance = balance - amount;
                console.log("Withdrawal Successful");
                console.log("Current Balance = " + balance);
            }
        } else if (operation == "2") {
            let amount = Number(prompt("Enter amount to deposit:"));
            if (amount > 0) {
                balance = balance + amount;
                console.log("Deposit Successful");
                console.log("Current Balance = " + balance);
            } else {
                console.log("Deposit amount must be greater than zero.");
            }
        } else if (operation == "3") {
            console.log("Current Balance = " + balance);
        } else if (operation == "4") {
            let newPin = prompt("Enter New 4-digit PIN:");
            if (newPin.length == 4 && !isNaN(newPin)) {
                pin = newPin;
                console.log("PIN Changed Successfully");
                
            } else {
                console.log("PIN must contain exactly 4 digits.");
            }
        } else {
            console.log("Invalid Operation.");
        }

       
    }

}