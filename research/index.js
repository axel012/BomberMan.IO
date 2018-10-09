const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);

app.use(express.static(path.join(__dirname, 'main')));
server.listen(3000,"0.0.0.0", function() {
});
