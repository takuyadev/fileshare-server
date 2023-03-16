const { PORT } = require("./data.js");
const net = require("net");
const fs = require("fs");

// Start server
const server = net.createServer();

// Decode algorithm
const decode = (data) => Buffer.from(data, "utf-8").toString();

// Server actions on connection
server.on("connection", (client) => {
  // If user sends data to server
  client.on("data", (data) => {
    // Decode data text to utf-8
    const decodedPath = decode(data);

    // Read file on server folder
    fs.readFile(`./server/${decodedPath}`, (error, data) => {
      if (error) {
        console.log("Error sending file.");
        client.write("Error! File not found.");
        return error;
      }

      // If not error, write file to client
      console.log("File successfully sent!");
      client.write(`${decodedPath}, ${data}`);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is active on: ${PORT}`);
});
