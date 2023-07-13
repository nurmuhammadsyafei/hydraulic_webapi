const now = new Date();
const year = now.getFullYear();
const month = (now.getMonth() + 1).toString().padStart(2, '0');
// const periodNow = year+month
const periodNow = '202305'


module.exports = { periodNow };