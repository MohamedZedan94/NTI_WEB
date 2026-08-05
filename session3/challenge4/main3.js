function loadData(callback) {
    console.log("Loading...");

    setTimeout(() => {
        console.log("Data Loaded");
        callback();
    }, 2000);
}

function finished() {
    console.log("Loading Finished");
}

loadData(finished);