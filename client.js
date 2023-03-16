const { PORT, HOST } = require("./data.js");
const fs = require("fs");
const readline = require("readline");
const net = require("net");

// Start terminal interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


// Establish connection to host
const conn = net.createConnection({
  host: HOST,
  port: PORT,
});

// Encodes all data to utf-8
conn.setEncoding("utf-8");

// When connected, ask server for information
conn.on("connect", () => {
  rl.question("enter file name:", (answer) => {
    conn.write(answer);
  });
});

// Log data upon data received
conn.on("data", (file) => {
  const [path, data] = file.split(", ")

  fs.writeFile(`./local/${path}`, data, (error) => {
    if (error) {
      return error;
    }
    process.exit()
  });
});
