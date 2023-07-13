
const dotenv = require('dotenv').config()


const configDB = {

    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT_STRING,
    autoCommit: true
};


module.exports = { configDB };




