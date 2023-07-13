const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const moment = require('moment');
const { configDB } = require('../../../config/db');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));

// == package date == //
const { format } = require('date-fns');
// == package date == //

router.get('/', (req, res, next) => {

    const db = req.params.db;
    async function run() {
        var connection;
        try {
            connection = await oracledb.getConnection(configDB);
            let query = `SELECT * FROM (select NO_SUPPLY,PDO_NO,PDO_DESCRIPTION,PDO_ITEM,PDO_QTY,PDO_PERIOD from z3_summary_all  order by last_update desc NULLS LAST) where rownum <=40 `;
            const result = await connection.execute(query);
            const data = result.rows;
            res.status(200).json(
                {
                    message: "Connection success",
                    data: data
                }
            );
            await connection.close();
        } catch (error) {
            res.status(200).json({
                message: "ERROR",
                error: error
            });
        }
    }
    run();
})

router.get('/:pdono', (req, res, next) => {

    const pdoNo = req.params.pdono;
    async function run() {
        var connection;
        try {
            connection = await oracledb.getConnection(configDB);
            // let query = `select * from z3_summary_supply where PDO_NO like'%${pdoNo}%'`;
            let query = `SELECT * FROM (select NO_SUPPLY,PDO_NO,PDO_DESCRIPTION,PDO_ITEM,PDO_QTY from z3_summary_all  order by last_update desc NULLS LAST) where rownum <=40 AND PDO_NO like'%${pdoNo}%'`;
            const result = await connection.execute(query);
            const data = result.rows;
            res.status(200).json(
                {
                    message: "Connection success",
                    data: data
                }
            );
            await connection.close();
        } catch (error) {
            res.status(200).json({
                message: "ERROR",
                error: error
            });
        }
    }
    run();
})

router.get('/detail/:pdo_no', (req, res, next) => {
    const pdoNo = req.params.pdo_no;

    async function run() {
        var connection;
        try {
            connection = await oracledb.getConnection(configDB);
            let query = `select * from z3_detail_supply where PDO_NO='${pdoNo}' `;
            const result = await connection.execute(query);
            const data = result.rows;
            res.status(200).json(
                // {
                // message: "Connection success",
                data
                // }
            );
            await connection.close();
        } catch (error) {
            res.status(200).json({
                message: "ERROR",
                error: error
            });
        }
    }
    run();
})

// QUERY INSERT QUERY INSERT QUERY INSERT QUERY INSERT QUERY INSERT QUERY INSERT QUERY INSERT QUERY INSERT QUERY INSERT QUERY INSERT QUERY INSERT 
// QUERY INSERT QUERY INSERT QUERY INSERT QUERY INSERT QUERY INSERT QUERY INSERT QUERY INSERT QUERY INSERT QUERY INSERT QUERY INSERT QUERY INSERT 
router.post('/add', async (req, res) => {
    async function run() {
        const now = new Date();
        const todaye = format(now, 'dd-MMM-yy').toUpperCase();

        const valuenya = {
            pic_name: req.body.pic_name,
            sup_date: req.body.sup_date,
            pdo_no: req.body.pdo_no,
            sup_result: req.body.sup_result,
            // tube: req.body.tube,
            // islacking_tube: req.body.islacking_tube,
            // tube_note: req.body.tube_note,
            // bottom: req.body.bottom,
            // islacking_bottom: req.body.islacking_bottom,
            // head_rod: req.body.head_rod,
            // islacking_head_rod: req.body.islacking_head_rod,
            // flange_tc: req.body.flange_tc,
            // islacking_flangetc: req.body.islacking_flangetc,
            // small_part: req.body.small_part,
            // islacking_small_part: req.body.islacking_small_part,
            // cyl_head: req.body.cyl_head,
            // islacking_cyl_head: req.body.islacking_cyl_head,
            // compo_note: req.body.compo_note,
            // pbs_piston: req.body.pbs_piston,
            // islacking_piston: req.body.islacking_piston,
            // pbs_bushing: req.body.pbs_bushing,
            // islacking_bushing: req.body.islacking_bushing,
            // pbs_sealkit: req.body.pbs_sealkit,
            // islacking_sealkit: req.body.islacking_sealkit,
            // pbs_note: req.body.pbs_note,
            created_date: todaye
        };

        try {
            connection = await oracledb.getConnection(configDB);
            // var query = `INSERT INTO Z3_SUPPLY(PIC_NAME,SUP_DATE,PDO_NO,SUP_RESULT) values('${pic_name}','${sup_date}','${pdo_no}','${sup_result}')`;
            var query = `INSERT INTO Z3_SUPPLY(PIC_NAME,SUP_DATE,PDO_NO,SUP_RESULT,CREATED_DATE)values(:pic_name,:sup_date,:pdo_no,:sup_result,:created_date)`;
            const result = await connection.execute(query, valuenya, { autoCommit: true });
            res.status(200).json({
                message: "Connection success",
                result: result
            });
            await connection.close();
        } catch (error) {
            res.status(200).json({
                message: "GAGAL",
                error: error,
                body: req.body, query: query
            });
        }

    }
    run();
})



router.post('/addtube', async (req, res) => {
    async function run() {
        const valuenya = {
            pic_name: req.body.pic_name,
            sup_date: moment(req.body.sup_date).format('DD-MMM-YY').toUpperCase(),
            pdo_no: req.body.pdo_no,
            pdo_prd: req.body.pdo_prd,
            sup_result: req.body.sup_result,
            tube: req.body.tube,
            islacking_tube: req.body.islacking_tube,
            tube_note: req.body.tube_note
        };

        try {
            connection = await oracledb.getConnection(configDB);
            var query = `CALL Z3_ADD_SUPPLY_TUBE(:pic_name,:sup_date,:pdo_no,:pdo_prd,:sup_result,'LINE TUBE',:tube,:islacking_tube,:tube_note)`;
            const result = await connection.execute(query, valuenya, { autoCommit: true });
            res.status(200).json({
                message: "Insert success",
                status: res.statusCode,
                // result: result
            });
            await connection.close();
        } catch (error) {
            res.status(200).json({
                status: res.statusCode,
                message: "GAGAL",
                // error: error,
                // body: req.body, query: query
            });
        }

    }
    run();
})

// 

router.post('/addcompo', async (req, res) => {
    async function run() {

        const valuenya = {
            pic_name: req.body.pic_name,
            sup_date: moment(req.body.sup_date).format('DD-MMM-YY').toUpperCase(),
            pdo_no: req.body.pdo_no,
            pdo_prd: req.body.pdo_prd,
            sup_result: req.body.sup_result,

            bottom: req.body.bottom,
            islacking_bottom: req.body.islacking_bottom,
            head_rod: req.body.head_rod,
            islacking_head_rod: req.body.islacking_head_rod,
            flange_tc: req.body.flange_tc,
            islacking_flangetc: req.body.islacking_flangetc,
            small_part: req.body.small_part,
            islacking_small_part: req.body.islacking_small_part,
            cyl_head: req.body.cyl_head,
            islacking_cyl_head: req.body.islacking_cyl_head,
            compo_note: req.body.compo_note
        };

        try {
            connection = await oracledb.getConnection(configDB);
            var query = `CALL Z3_ADD_SUPPLY_COMPO(:pic_name,:sup_date,:pdo_no,:pdo_prd,:sup_result,:bottom,:islacking_bottom,:head_rod,:islacking_head_rod,:flange_tc,:islacking_flangetc,:small_part,:islacking_small_part,:cyl_head,:islacking_cyl_head,:compo_note)`;
            const result = await connection.execute(query, valuenya, { autoCommit: true });
            res.status(200).json({
                message: "Insert success",
                status: res.statusCode,
            });
            await connection.close();
        } catch (error) {
            res.status(200).json({
                status: res.statusCode,
                message: "GAGAL",
            });
        }

    }
    run();
})



router.post('/addpbs', async (req, res) => {
    async function run() {
        const valuenya = {
            pic_name: req.body.pic_name,
            sup_date: moment(req.body.sup_date).format('DD-MMM-YY').toUpperCase(),
            pdo_no: req.body.pdo_no,
            pdo_prd: req.body.pdo_prd,
            sup_result: req.body.sup_result,

            pbs_piston: req.body.pbs_piston,
            islacking_piston: req.body.islacking_piston,
            pbs_bushing: req.body.pbs_bushing,
            islacking_bushing: req.body.islacking_bushing,
            pbs_sealkit: req.body.pbs_sealkit,
            islacking_sealkit: req.body.islacking_sealkit,
            pbs_note: req.body.pbs_note,
        };

        try {
            connection = await oracledb.getConnection(configDB);
            var query = `CALL Z3_ADD_SUPPLY_PBS(:pic_name,:sup_date,:pdo_no,:pdo_prd,:sup_result,:pbs_piston,:islacking_piston,:pbs_bushing,:islacking_bushing,:pbs_sealkit,:islacking_sealkit,:pbs_note)`;
            const result = await connection.execute(query, valuenya, { autoCommit: true });
            res.status(200).json({
                message: "Insert success",
                status: res.statusCode
            });
            await connection.close();
        } catch (error) {
            res.status(200).json({
                status: res.statusCode,
                message: "GAGAL"
            });
        }

    }
    run();
})
// 

// router.post('/addcompoo', async (req, res) => {
//     async function run() {
//         const now = new Date();
//         const todaye = format(now, 'dd-MMM-yy').toUpperCase();

//         const valuenya = {
//             // pic_name: req.body.pic_name,
//             // sup_date: req.body.sup_date,
//             // pdo_no: req.body.pdo_no,
//             // sup_result: req.body.sup_result,

//             // bottom: req.body.bottom,
//             // islacking_bottom: req.body.islacking_bottom,
//             // head_rod: req.body.head_rod,
//             // islacking_head_rod: req.body.islacking_head_rod,
//             // flange_tc: req.body.flange_tc,
//             // islacking_flangetc: req.body.islacking_flangetc,
//             // small_part: req.body.small_part,
//             // islacking_small_part: req.body.islacking_small_part,
//             // cyl_head: req.body.cyl_head,
//             // islacking_cyl_head: req.body.islacking_cyl_head,
//             // compo_note: req.body.compo_note

//             // created_date: todaye
//         };

//         try { 

//             connection = await oracledb.getConnection(configDB);
//             var query = `CALL Z3_ADD_SUPPLY_COMPO('109200','17-JUL-23','130085561','Line Compo','17','1','0','0','0','0','0','0','0','0','LAKING')`;
//             // var query1 = `CALL Z3_ADD_SUPPLY_COMPO :bottom,:islacking_bottom,:head_rod,:islacking_head_rod,:flange_tc,`;
//             // var query2 = `:islacking_flangetc,:small_part,:islacking_small_part,:cyl_head,:islacking_cyl_head,:compo_note`;
//             // var query = query1+query2;
//             const result = await connection.execute(query, valuenya, { autoCommit: true });
//             res.status(200).json({
//                 message: "Insert success",
//                 status :  res.statusCode,
//                 // result: result
//             });
//             await connection.close();
//         } catch (error) {
//             res.status(500).json({
//                 status :  error,
//                 note :  req.body
//                 // message: "GAGAL",
//                 // error: error,
//                 // body: req.body, query: query
//             });
//         }

//     }
//     run();
// })


// router.post('/addpbss', async (req, res) => {
//     async function run() {
//         const now = new Date();
//         const todaye = format(now, 'dd-MMM-yy').toUpperCase();

//         const valuenya = {
//             pic_name: req.body.pic_name,
//             sup_date: req.body.sup_date,
//             pdo_no: req.body.pdo_no,
//             sup_result: req.body.sup_result,

//             pbs_piston: req.body.pbs_piston,
//             islacking_piston: req.body.islacking_piston,
//             pbs_bushing: req.body.pbs_bushing,
//             islacking_bushing: req.body.islacking_bushing,
//             pbs_sealkit: req.body.pbs_sealkit,
//             islacking_sealkit: req.body.islacking_sealkit,
//             pbs_note: req.body.pbs_note,

//             created_date: todaye
//         };

//         try {
//             connection = await oracledb.getConnection(configDB);
//             var query1 = `INSERT INTO Z3_SUPPLY(PIC_NAME,SUP_DATE,PDO_NO,SUP_RESULT,PBS_PISTON,ISLACKING_PISTON,PBS_BUSHING,ISLACKING_BUSHING,PBS_SEALKIT,ISLACKING_SEALKIT,PBS_NOTE,CREATED_DATE)`;
//             var query2 = `values(:pic_name,:sup_date,:pdo_no,:sup_result,:pbs_piston,:islacking_piston,:pbs_bushing,:islacking_bushing,:pbs_sealkit,:islacking_sealkit,:pbs_note,:created_date)`;
//             var query = query1+query2;

//             const result = await connection.execute(query, valuenya, { autoCommit: true });
//             res.status(200).json({
//                 message: "Connection success",
//                 status :  res.statusCode,
//                 // result: result
//             });
//             await connection.close();
//         } catch (error) {
//             res.status(200).json({
//                 status :  res.statusCode,
//                 // message: "GAGAL",
//                 // error: error,
//                 // body: req.body, query: query
//             });
//         }

//     }
//     run();
// })


module.exports = router;