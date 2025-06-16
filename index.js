const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const baseDir = path.join(__dirname, "files");

if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir);
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;
  const filename = query.filename;

  res.setHeader("Content-Type", "text/plain");

  if (!filename) {
    res.writeHead(400);
    return res.end("Error: filename is required as a query parameter.");
  }

  const filePath = path.join(baseDir, path.basename(filename));

  if (pathname === "/create" && req.method === "POST") {
    const content = query.content || "";
    fs.writeFile(filePath, content, (err) => {
      if (err) {
        res.writeHead(500);
        return res.end("Failed to create file.");
      }
      res.writeHead(200);
      res.end(`File "${filename}" created successfully.`);
    });


  } else if (pathname === "/read" && req.method === "GET") {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end("File not found.");
      }
      res.writeHead(200);
      res.end(`Content of "${filename}":\n\n${data}`);
    });

    
  } else if (pathname === "/delete" && req.method === "DELETE") {
    fs.unlink(filePath, (err) => {
      if (err) {
        res.writeHead(404);
        return res.end("File not found or could not be deleted.");
      }
      res.writeHead(200);
      res.end(`File "${filename}" deleted successfully.`);
    });

  } else {
    res.writeHead(404);
    res.end("Invalid route or method.");
  }
});


server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
