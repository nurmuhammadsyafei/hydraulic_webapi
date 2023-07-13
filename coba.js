// const now = new Date();
// const year = now.getFullYear();
// const month = (now.getMonth() + 1).toString().padStart(2, '0');
// const periodNow = year+month
// console.log('Year:', year);
// console.log('Month:', month);
// console.log('periodNow:', process.env.LOC_CS_KI);


const { periodNow } = require('./api/middleware/global_var');


console.log("periodNow ",periodNow);