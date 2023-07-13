
const express = require('express');
const app = express();

const exampleRoutes = require('./api/routes/example');
const z3Routes = require('./api/routes/z3');
const z3_Users = require('./api/routes/z3_users');
const supply = require('./api/routes/new/supply');
const pdo = require('./api/routes/pdo');
const prod = require('./api/routes/new/prod');
const helo = require('./api/routes/helo');


app.use('/example',exampleRoutes);
app.use('/z3', z3Routes);
app.use('/z3_users', z3_Users);
app.use('/supply', supply);
app.use('/pdo', pdo);
app.use('/prod', prod);
app.use('/', helo);

module.exports = app;









// app.use((req,res,next)=>{
//     res.status(200).json({
//         message:"Berjalan dengan baik!"
//     });
// });

// app.use('/example',require('./api/routes/example'));




//
/*
const express = require('express');
const app = express();

const productRoutes = require('./api/routes/products');
// const orderRoutes = require('./api/routes/orders');

app.use('/products', productRoutes);
// app.use('/orders', orderRoutes);

module.exports = app;*/