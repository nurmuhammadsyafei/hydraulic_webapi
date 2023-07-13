const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const { configDB } = require('../../config/db');
const { periodNow } = require('../middleware/global_var');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const router = express.Router();

router.get('/', (req, res, next) => {
    async function run() {
        var connection;
        try {
            connection = await oracledb.getConnection(configDB);
            let query = `select * from Z3_PDO_LIST`;

            let result = await connection.execute(query);
            let data = result.rows;
            res.status(200).json({
                status: res.statusCode,
                message: "Connection OK",
                length: result.rows.length,
                data: data
            });
            await connection.close();
        } catch (error) {
            res.status(500).json({
                message: "Internal server errorr",
                error: error
            });
        }
    }
    run();
});



router.get('/:nopdo/:tglSupply', (req, res, next) => {
    var nopdo = req.params.nopdo;
    var period = req.params.tglSupply.replace('-','').replace('-','') .substring(0, 6);
    // const date = new Date(period);
    // res.status(200).json({
    //     message : period
    // });

    async function run() {
        var connection;
        try {
            connection = await oracledb.getConnection(configDB);
            let query = `select * from Z3_PDO_LIST where PDO_NO=${nopdo} and PDO_PERIOD=${period}`;
            let result = await connection.execute(query);
            let data = result.rows;
            if (result.rows.length > 0) {
                res.json({
                    status: res.statusCode,
                    message: "Koneksi Berhasil",
                    length: result.rows.length,
                    data: data
                });
            } else {
                res.status(404).json({
                    status: 404,
                    message: "PDO Not Found",
                    length: result.rows.length,
                });
            }
            await connection.close();
        } catch (error) {
            res.status(500).json({
                message: "ERROR",
                error: error
            });
        }
    }
    run();
});


module.exports = router;