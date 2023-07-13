const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const { serverConfig, lokalKi, localConfig, prodConfig } = require('../../config/db');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const router = express.Router();
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const verifikasitoken = require('../middleware/verify_token')


// router.get('/', (req, res, next) => {
//     // res.json({
//     //  result:serverConfig
//     // })
//     const db = req.params.db;
//     async function run() {
//         var connection;
//         try {
//             connection = await oracledb.getConnection(localConfig);
//             let query = `SELECT * FROM z3_test_users`;
//             const result = await connection.execute(query);
//             const data = result.rows;
//             res.status(200).json(
//             {
//                 message: "Connection success",
//                 data: data
//             }
//             );
//         } catch (error) {
//             res.status(200).json({
//                 message: "ERROR",
//                 error: error
//             });
//         }
//     }
//     run();
// });

// router.get('/:userID', (req, res, next) => {

//     const userID = req.params.userID;
//     async function run() {
//         var connection;
//         try {
//             connection = await oracledb.getConnection(localConfig);
//             let query = `SELECT * FROM z3_test_users where USER_ID=KI20296`;
//             const result = await connection.execute(query);
//             const data = result.rows;
//             res.status(200).json(
//             {
//                 message: "Connection success",
//                 data: query
//             }
//             );
//         } catch (error) {
//             res.status(200).json({
//                 message: "ERROR",
//                 error: error
//             });
//         }
//     }
//     run();
// });

router.get('/', verifikasitoken, (req, res, next) => {
    // res.status(200).json({
    //     message : "Ini adalah Get Kosongan"
    // })
    const db = req.params.db;
    async function run() {
        var connection;
        try {
            connection = await oracledb.getConnection(prodConfig);
            let query = `SELECT * FROM z3_test_users`;
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
                error: error,
                mnsPstr: process.env.MNSPUS,
                mnsPpw: process.env.MNSPPW,
                mnsPus: process.env.MNSPSTR
            });
        }
    }
    run();
})



router.get('/ambilToken', (req, res, next) => {
    // res.status(200).json({
    //     message : "Ini adalah Get Kosongan"
    // })
    const db = req.params.db;
    async function run() {
        var connection;
        try {
            // connection = await oracledb.getConnection(localConfig);
            // let query = `SELECT * FROM z3_test_users`;
            // const result = await connection.execute(query);
            // const data = result.rows;
            // const token = jwt.sign({_tokentest:"Babilonia"},process.env.TOKEN_RAHASIA);
            // const expiresIn = '1h';
            const payload = {
                userId: '123456789',
                username: 'john.doe',
            };
            //   TOKEN BERLAKU SELAMA 1 MENIT
            const token = jwt.sign(payload, process.env.TOKEN_RAHASIA, { expiresIn: '1m' });
            res.header('auth-token', token).send(process.env.mnsus);
            // res.status(200).json(
            // {
            //     message: "Connection success",
            //     data: data
            // }
            // );
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
    const userID = req.params.userID;
    async function run() {
        var connection;
        try {
            connection = await oracledb.getConnection(prodConfig);
            let query = `SELECT * FROM z3_test_users where USER_ID='KI20296'`;
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
                error: error
            });
        }
    }
    run();
})
module.exports = router;