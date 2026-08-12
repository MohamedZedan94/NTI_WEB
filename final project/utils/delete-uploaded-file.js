const fs = require("fs").promises;
const path = require("path");

async function deleteUploadedFile(folderName, filename) {
    try {
        const filePath = path.join(
            __dirname,
            "..",
            "uploads",
            folderName,
            filename
        );

        console.log("Deleting:", filePath);

        await fs.unlink(filePath);

        console.log("File deleted successfully");
    } catch (err) {
        console.log("Delete Error:", err.message);
    }
}

module.exports = deleteUploadedFile;