// const express = require("express");

// const app = express();

// app.get("/", (req, res) => {
//   const host = req.hostname;
//   const hostNames = host.split(".");

//   const subDomains = hostNames.slice(0, hostNames.length - 1);
//   const mainDomain = hostNames[hostNames.length - 1];

//   console.log(subDomains);
//   console.log(mainDomain);

//   res.send(`Hello from ${host}`);
// });

// app.listen(3000, () => {
//   console.log("Example app listening on port 3000!");
// });

const { createServer } = require("http");

const server = createServer((req, res) => {
  const host = req.headers.host;
  const hostNames = host.split(".");

  const subDomains = hostNames.slice(0, hostNames.length - 1);
  const mainDomain = hostNames[hostNames.length - 1];

  console.log(subDomains);
  console.log(mainDomain);

  res.end(`Hello from ${host}`);
});

server.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
