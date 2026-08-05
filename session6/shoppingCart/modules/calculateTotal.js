import cart from "../data/cart.js";

function calculateTotal() {

    let total = 0;

    cart.forEach(item => {
        total += item.price;
    });

    console.log("Total = $" + total);

}

export default calculateTotal;