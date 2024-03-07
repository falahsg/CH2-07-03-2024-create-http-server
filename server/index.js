// core package -> built in node js
const http = require("http");
const fs = require("fs");
const path = require("path");

// third party package
const url = require("url");


const PORT = 8000;

const server = (req, res) => {
  // localhost:8000
  if (req.url === "/") {
    req.url = "index.example.html"
  }
  // localhost:8000/search
  else if (req.url === "/search") {
    res.end("ini halaman search");
  } else {
    res.end("gak ada....");
  }

  const PUBLIC_DIRECTORY = path.join(__dirname, "../public");
  const parseURL = url.parse(req.url);
  const pathName = `${parseURL.pathname}`;
  const extension = path.parse(pathName).ext;
  const absolutePath = path.join(PUBLIC_DIRECTORY, pathName);
  

  const contentTypes = {
    ".css": "text/css",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".html": "text/html",
    ".js": "text/javascript",
  };

  fs.readFile(absolutePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end("File not found ...");
    } else {
      res.setHeader("Content-Type", contentTypes[extension] || "text/plain");
      res.end(data);
    }
  });
};
http.createServer(server).listen(PORT);
console.log(`server running... PORT : localhost:${PORT}`);
