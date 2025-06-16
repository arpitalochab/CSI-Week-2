# 🗂️ Node.js File Management Tool

A simple file manager built with **Node.js core modules** 

## 🔧 Features
- ✅ Create a file using HTTP `POST`
- 📖 Read file contents using `GET`
- ❌ Delete a file using `DELETE`
- Uses only built-in Node.js modules: `fs`, `http`, `path`, `url`

## 📂 Folder Structure
project-folder/
├── index.js # Main server file
├── files/ # Created automatically, stores user files
├── .gitignore 
└── README.md


## 🚀 How to Run

1. Install Node.js if not already: https://nodejs.org/
2. Clone this repo or download it
3. In terminal:
   ```bash
   node index.js
4.Server will start at: http://localhost:3000

💡 Example Usage 
Create:
## type this in new terminal to create a file name test.txt using POST

Invoke-WebRequest -Uri "http://localhost:3000/create?filename=test.txt&content=Hello World" -Method POST

Read:
## type this in new terminal to read a file name test.txt using GET

Invoke-WebRequest -Uri "http://localhost:3000/read?filename=test.txt" -Method GET

Delete:
## type this in new terminal to delete a file name test.txt using DELETE

Invoke-WebRequest -Uri "http://localhost:3000/delete?filename=test.txt" -Method DELETE


## Similarly you can create, read or delete other files using this file manager



