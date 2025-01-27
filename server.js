const http = require("http");
const path = require("path");
const fs = require("fs");

const publicFolderPath = path.join(__dirname, "public");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    sendFile(res, publicFolderPath + "/index.html");
  } else {
    const filePath = path.join(publicFolderPath, req.url);
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
      } else {
        sendFile(res, filePath);
      }
    });
  }
});

function sendFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("error while reading file", err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("server error");
    }

    res.writeHead(200, { "Content-Type": getContentType(filePath) });
    return res.end(data);
  });
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".html":
      return "text/html";
    case ".js":
      return "application/javascript";
    case ".css":
      return "text/css";
    case ".json":
      return "application/json";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    default:
      return "text/plain";
  }
}

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
