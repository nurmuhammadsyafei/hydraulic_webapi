const http = require('http');
const app = require('./app');








const port = process.env.PORT || 3003;
const server = http.createServer(app);
server.listen(port);

// const server = 

// server.listen(3003);

//
// const http = require('http');
// const app = require('./app');

// const port = process.env.PORT || 3000;

// const server = http.createServer(app);

// server.listen(port);

// app.listen(port, () => {
//     console.log(`Server started on port ${port}`);
// });