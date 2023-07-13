const express = require('express');
const router = express.Router();
const { configDB } = require('../../config/db');

const oracledb = require('oracledb');

router.get('/', (req, res, next) => {
    // res.status(200).json({
    //     message: "Hello, Connection is OKAY",
    //     status: res.statusCode
    // });


    async function connectToOracle() {
        try {
            await oracledb.createPool({
                user: "MANIS",
                password: "password01",
                connectString: "idki-oracledev:1521/vp",
            });
            await oracledb.getPool().close();
            
            res.status(200).json({
                status: res.statusCode,
                message: "Connection OK",
            });

        } catch (err) {
            res.status(500).json({
                status: res.statusCode,
                message: "GAGAL KONEKSI :(",
                error : err
            });
        }
    }

    connectToOracle();


});


module.exports = router;