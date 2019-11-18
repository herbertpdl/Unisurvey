const server = require("./server");
const express = require('express')

const port = process.env.PORT || 3002

// Handle production
if(process.env.NODE_ENV === 'production') {
  // Static folder
  server.use(express.static(__dirname + '/public'));

  // Handle SPA
  server.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

server.listen(port);



