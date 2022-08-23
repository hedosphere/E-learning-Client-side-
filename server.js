const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then((o) => {
  const server = express();
  if (dev) {
    server.use(
      "/api",
      createProxyMiddleware({
        hangeOrigin: true,
        target: "http://localhost:9000/",
      })
    );
  }

  server.all("*", (req, res) => {
    handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Proxy is Ready ");
  });
});
