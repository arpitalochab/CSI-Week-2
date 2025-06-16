const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Directory where all file operations will take place
const baseDir = path.join(__dirname, 'files');

// Create the 'files' directory if it doesn't exist
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir);
}

// Create HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;
  const filename = query.filename;

  // Set response type
  res.setHeader('Content-Type', 'text/plain');

  // Validate that a filename is provided
  if (!filename) {
    res.writeHead(400);
    return res.end('Error: filename is required as a query parameter.');
  }

  // Ensure safe file path inside baseDir
  const filePath = path.join(baseDir, path.basename(filename));

  // Handle CREATE file: POST /create?filename=name.txt&content=hello
  if (pathname === '/create' && req.method === 'POST') {
    const content = query.content || '';
    fs.writeFile(filePath, content, (err) => {
      if (err) {
        res.writeHead(500);
        return res.end('Failed to create file.');
      }
      res.writeHead(200);
      res.end(`File "${filename}" created successfully.`);
    });

  // Handle READ file: GET /read?filename=name.txt
  } else if (pathname === '/read' && req.method === 'GET') {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end('File not found.');
      }
      res.writeHead(200);
      res.end(`Content of "${filename}":\n\n${data}`);
    });

  // Handle DELETE file: DELETE /delete?filename=name.txt
  } else if (pathname === '/delete' && req.method === 'DELETE') {
    fs.unlink(filePath, (err) => {
      if (err) {
        res.writeHead(404);
        return res.end('File not found or could not be deleted.');
      }
      res.writeHead(200);
      res.end(`File "${filename}" deleted successfully.`);
    });

  // Handle invalid routes or methods
  } else {
    res.writeHead(404);
    res.end('Invalid route or method.');
  }
});

// Start the server
server.listen(3000, () => {
  console.log('✅ File Management Server is running at http://localhost:3000');
});
