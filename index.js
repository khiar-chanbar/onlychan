const express = require("express");

const app = express();

app.get("/", (req, res) => {
  const host = req.hostname;
  const hostNames = host.split(".");

  const subDomains = hostNames.slice(0, hostNames.length - 1);
  const mainDomain = hostNames[hostNames.length - 1];

  console.log(subDomains);
  console.log(mainDomain);

  if (subDomains.length > 0) return res.sendStatus(404);

  res.send(`Hello from ${host}, ${JSON.stringify(req)}`);
});

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
