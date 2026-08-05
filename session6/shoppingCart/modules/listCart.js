import cart from "../data/cart.js";

function listCart() {

    if (cart.length === 0) {
        console.log("Cart is empty.");
        return;
    }

    console.log("Cart:");

    cart.forEach(item => {
        console.log(item.name + " - $" + item.price);
    });

}

export default listCart;