function shippingPrice(kg) {
    return new Promise((resolve, reject) => {
        if (kg < 1) {
            reject("Invalid weight");
            return;
        }

        const total = kg * 5;
        resolve(`Shopping Cost : ${total}`);
    });
}
shippingPrice(2)
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
shippingPrice(-22)
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });