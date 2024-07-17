const http = require('http');
const fs = require('fs');
const now = new Date();
const currentDateTime = now.toISOString().replace(/:/g, '-');
const testFolder = '../node/';

fs.writeFile(`${currentDateTime}.txt`, `${currentDateTime}`, "utf-8", (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("It is success");
    }
});

fs.readdir(testFolder, (err, files) => {
    if (err) {
        console.log(err)
    } else {
        console.log(files);
    }
    files.forEach(file => {
        console.log(file);
    });
});

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    try {
        if (req.method === "GET") {
            let data = fs.readFileSync(`${currentDateTime}`, "utf-8");
            let response = {
                status: 200,
                message: "file read successful",
                data
            }
            res.end(JSON.stringify(response));
        }
    } catch (err) {
        console.log(err);
    }
})

// Start the server
server.listen(3000, () => {
    console.log("Server is listening to port no: 3000")
});