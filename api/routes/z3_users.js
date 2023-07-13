const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const {configDB} = require('../../config/db');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const router = express.Router();



router.get('/', (req, res, next) => {
    // res.status(200).json({
    //     message : "Ini adalah Get Kosongan"
    // })
    const db = req.params.db;
    async function run() {
        var connection;
        try {
            connection = await oracledb.getConnection(configDB);
            let query = `SELECT * FROM Z3_USER_LIST`;
            const result = await connection.execute(query);
            const data = result.rows;
            res.status(200).json(
                {
                    message: "Connection success",
                    data: data
                }
            );
        } catch (error) {
            res.status(200).json({
                message: "ERROR",
                error: error
            });
        }
    }
    run();
})

router.get('/prod', (req, res, next) => {
    // res.status(200).json({
    //     message : "Ini adalah Get Kosongan"
    // })
    const db = req.params.db;
    async function run() {
        var connection;
        try {
            connection = await oracledb.getConnection(configDB);
            let query = `SELECT  rownum as NO, a.* from (SELECT * FROM Z3_USER_LIST where USER_GRUP_ID in('Prod','Prod + WHS') order by USER_NAME asc) a`;
            const result = await connection.execute(query);
            const data = result.rows;
            res.status(200).json(
                {
                    message: "Connection success",
                    data: data
                }
            );
        } catch (error) {
            res.status(200).json({
                message: "ERROR",
                error: error
            });
        }
    }
    run();
})


router.get('/warehouse', (req, res, next) => {
    // res.status(200).json({
    //     message : "Ini adalah Get Kosongan"
    // })
    const db = req.params.db;
    async function run() {
        var connection;
        try {
            connection = await oracledb.getConnection(configDB);
            let query = `SELECT rownum as NO,a.* FROM (SELECT * FROM Z3_USER_LIST where USER_GRUP_ID in('Warehouse','Prod + WHS')order by USER_NAME asc ) a`;
            const result = await connection.execute(query);
            const data = result.rows;
            res.status(200).json(
                {
                    message: "Connection success",
                    data: data
                }
            );
        } catch (error) {
            res.status(200).json({
                message: "ERROR",
                error: error
            });
        }
    }
    run();
})


router.get('/:userID', (req, res, next) => {
    // res.status(200).json({
    //     message : "Ini adalah GET PARAM 1"
    // })
    const user = req.params.userID;
    async function run() {
        var connection;
        try {
            connection = await oracledb.getConnection(configDB);
            var query = `SELECT * FROM Z3_USER_LIST where USER_ID='${user}'`;
            const result = await connection.execute(query);
            const data = result.rows;
            res.status(200).json(
                {
                    message: "Connection successdsadda",
                    data: data
                }
            );
        } catch (error) {
            res.status(200).json({
                message: "ERROR",
                error: error, query: query
            });
        }
    }
    run();
})
module.exports = router;