const items = {
    1: "phone",
    2: "pc",
    3: "laptop"
};
function findProduct(productId) {
    return new Promise((resolve, reject) => {
        if (productId in items) {
            resolve(items[productId]);
        } else {
            reject("Not Found");
        }
    });
}
setTimeout(() => {
    findProduct(2)
        .then(result => {
            console.log(result);
        })
        .catch(() => {
            console.log("ntfound");
        });
}, 1000);
setTimeout(() => {
    findProduct(4)
        .then(result => {
            console.log(result);
        })
        .catch(() => {
            console.log("ntfound");
        });
}, 3000);