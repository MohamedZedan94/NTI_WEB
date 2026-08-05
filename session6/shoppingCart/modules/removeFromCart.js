import cart from "../data/cart.js";

function removeFromCart(id) {

    const index = cart.findIndex(item => item.id === id);

    if (index !== -1) {
        console.log(cart[index].name + " removed.");
        cart.splice(index, 1);
    } else {
        console.log("Product not found in cart.");
    }

}

export default removeFromCart;