import products from "../data/products.js";
import cart from "../data/cart.js";

function addToCart(id) {

    const product = products.find(item => item.id === id);

    if (product) {
        cart.push(product);
        console.log(product.name + " added.");
    } else {
        console.log("Product not found.");
    }

}

export default addToCart;