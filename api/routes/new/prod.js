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
            let query = `select * from z3_summary_prod`;
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
            let query = `select * from z3_detail_prod where PDO_NO='${pdoNo}' `;
            const result = await connection.execute(query);
            const data = result.rows;
            res.status(200).json(data);
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

router.post('/add', async (req, res) => {
    async function run() {
        const now = new Date();
        const todaye = format(now, 'dd-MMM-yy').toUpperCase();

        const valuenya = {
            pic_name: req.body.pic_name,
            prod_date: req.body.prod_date,
            pdo_no: req.body.pdo_no,
            prod_result: req.body.prod_result,
            // cutting_rod_ok      : req.body.cutting_rod_ok,
            // cutting_rod_ng      : req.body.cutting_rod_ng,
            // cutting_rod_note    : req.body.cutting_rod_note,
            // headrod_ok          : req.body.headrod_ok,
            // headrod_ng          : req.body.headrod_ng,
            // headrod_note        : req.body.headrod_note,
            // cylinder_head_ok    : req.body.cylinder_head_ok,
            // cylinder_head_ng    : req.body.cylinder_head_ng,
            // cylinder_head_note  : req.body.cylinder_head_note,
            // bottom_ok           : req.body.bottom_ok,
            // bottom_ng           : req.body.bottom_ng,
            // bottom_note         : req.body.bottom_note,
            // flange_ok           : req.body.flange_ok,
            // flange_ng           : req.body.flange_ng,
            // flange_note         : req.body.flange_note,
            // trunion_ok          : req.body.trunion_ok,
            // trunion_ng          : req.body.trunion_ng,
            // trunion_note        : req.body.trunion_note,
            // collar_ok           : req.body.collar_ok,
            // collar_ng           : req.body.collar_ng,
            // collar_note         : req.body.collar_note,
            // rod_ok              : req.body.rod_ok,
            // rod_ng              : req.body.rod_ng,
            // rod_note            : req.body.rod_note,
            // tube_ok             : req.body.tube_ok,
            // tube_ng             : req.body.tube_ng,
            // tube_note           : req.body.tube_note,
            // assembly_ok         : req.body.assembly_ok,
            // assembly_ng         : req.body.assembly_ng,
            // assembly_note       : req.body.assembly_note,
            // painting_ok         : req.body.painting_ok,
            // painting_ng         : req.body.painting_ng,
            // painting_note       : req.body.painting_note,
            created_date: todaye
        };

        try {
            connection = await oracledb.getConnection(configDB);
            // var query = `INSERT INTO Z3_SUPPLY(PIC_NAME,SUP_DATE,PDO_NO,SUP_RESULT) values('${pic_name}','${sup_date}','${pdo_no}','${sup_result}')`;
            var query1 = `INSERT INTO Z3_PROD_PROGRESS(PIC_NAME,PROD_DATE,PDO_NO,PROD_RESULT,CREATED_DATE)`;
            var query2 = `values(:pic_name,:prod_date,:pdo_no,:prod_result,:created_date)`;
            var query = query1 + query2;
            const result = await connection.execute(query, valuenya, { autoCommit: true });
            res.status(200).json({
                message: "Connection success",
                result: result
            });
            await connection.close();
        } catch (error) {
            res.status(500).json({
                message: "GAGAL",
                error: error,
                body: req.body, query: query
            });
        }

    }
    run();
})




// === === === === === === === === === === === ===  START START START START  === === === === === === === === === === === ===
// === === === === === === === === === === === === START CUTTING ROD INSERT  === === === === === === === === === === === ===

router.post('/addcutrod', async (req, res) => {
    async function run() {

        const valuenya = {
            pic_name: req.body.pic_name,
            prod_date: moment(req.body.prod_date).format('DD-MMM-YY').toUpperCase(),
            pdo_no: req.body.pdo_no,
            pdo_prd: req.body.pdo_prd,
            prod_result: req.body.prod_result,
            cutting_rod_ok: req.body.cutting_rod_ok,
            cutting_rod_ng: req.body.cutting_rod_ng,
            cutting_rod_note: req.body.cutting_rod_note,
        };

        try {
            connection = await oracledb.getConnection(configDB);
            var query = `CALL Z3_ADD_PROD(:pic_name,:prod_date,:pdo_no,:pdo_prd,:prod_result,'CUTTING ROD',:cutting_rod_ok,:cutting_rod_ng,:cutting_rod_note)`;
            const result = await connection.execute(query, valuenya, { autoCommit: true });
            res.status(200).json({
                message: "Connection success",
                status: res.statusCode,
            });
            await connection.close();
        } catch (error) {
            res.status(500).json({
                status: res.statusCode,
            });
        }

    }
    run();
})

// === === === === === === === === === === === === END CUTTING ROD INSERT  === === === === === === === === === === === ===



// === === === === === === === === === === === === START LINE COMPO INSERT  === === === === === === === === === === === ===



router.post('/addcompo', async (req, res) => {
    async function run() {
        // const now = new Date();
        // const todaye = format(now, 'dd-MMM-yy').toUpperCase();

        const valuenya = {
            pic_name: req.body.pic_name,
            prod_date: moment(req.body.prod_date).format('DD-MMM-YY').toUpperCase(),
            pdo_no: req.body.pdo_no,
            pdo_prd: req.body.pdo_prd,
            prod_result: req.body.prod_result,

            headrod_ok: req.body.headrod_ok,
            headrod_ng: req.body.headrod_ng,
            headrod_note: req.body.headrod_note,
            cylinder_head_ok: req.body.cylinder_head_ok,
            cylinder_head_ng: req.body.cylinder_head_ng,
            cylinder_head_note: req.body.cylinder_head_note,
            bottom_ok: req.body.bottom_ok,
            bottom_ng: req.body.bottom_ng,
            bottom_note: req.body.bottom_note,
            flange_ok: req.body.flange_ok,
            flange_ng: req.body.flange_ng,
            flange_note: req.body.flange_note,
            trunion_ok: req.body.trunion_ok,
            trunion_ng: req.body.trunion_ng,
            trunion_note: req.body.trunion_note,
            collar_ok: req.body.collar_ok,
            collar_ng: req.body.collar_ng,
            collar_note: req.body.collar_note,

            // created_date        : todaye
        };

        try {
            connection = await oracledb.getConnection(configDB);
            var query1 = `CALL Z3_ADD_PROD_COMPO (:pic_name,:prod_date,:pdo_no,:pdo_prd,:prod_result,:headrod_ok,:headrod_ng,:headrod_note,:cylinder_head_ok,:cylinder_head_ng,:cylinder_head_note,`;
            var query2 = `:bottom_ok,:bottom_ng,:bottom_note,:flange_ok,:flange_ng,:flange_note,:trunion_ok,:trunion_ng,:trunion_note,:collar_ok,:collar_ng,:collar_note)`;
            var query = query1 + query2;
            const result = await connection.execute(query, valuenya, { autoCommit: true });
            res.status(200).json({
                status: res.statusCode,
                message: "Connection success",
                // result: result
            });
            await connection.close();
        } catch (error) {
            res.status(500).json({
                status: res.statusCode,
                // message: "GAGAL",
                // error: error,
                // body: req.body, query: query
            });
        }

    }
    run();
})


// === === === === === === === === === === === === END LINE COMPO INSERT  === === === === === === === === === === === ===




// === === === === === === === === === === === === START LINE ROD INSERT  === === === === === === === === === === === ===

router.post('/addlinerod', async (req, res) => {
    async function run() {
        // const now = new Date();
        // const todaye = format(now, 'dd-MMM-yy').toUpperCase();

        const valuenya = {
            pic_name: req.body.pic_name,
            prod_date: moment(req.body.prod_date).format('DD-MMM-YY').toUpperCase(),
            pdo_no: req.body.pdo_no,
            pdo_prd: req.body.pdo_prd,
            prod_result: req.body.prod_result,

            rod_ok: req.body.rod_ok,
            rod_ng: req.body.rod_ng,
            rod_note: req.body.rod_note,

            // created_date        : todaye
        };

        try {
            connection = await oracledb.getConnection(configDB);
            // var query = `INSERT INTO Z3_SUPPLY(PIC_NAME,SUP_DATE,PDO_NO,SUP_RESULT) values('${pic_name}','${sup_date}','${pdo_no}','${sup_result}')`;
            // var query1 = `INSERT INTO Z3_PROD_PROGRESS(PIC_NAME,PROD_DATE,PDO_NO,PROD_RESULT,ROD_OK,ROD_NG,ROD_NOTE,CREATED_DATE)`;
            // var query2= `values(:pic_name,:prod_date,:pdo_no,:prod_result,:rod_ok,:rod_ng,:rod_note,:created_date)`;
            // var query = query1+query2;

            var query = `CALL Z3_ADD_PROD(:pic_name,:prod_date,:pdo_no,:pdo_prd,:prod_result,'LINE ROD',:rod_ok,:rod_ng,:rod_note)`;
            const result = await connection.execute(query, valuenya, { autoCommit: true });
            res.status(200).json({
                status: res.statusCode,
                message: "Connection success",
                // result: result
            });
            await connection.close();
        } catch (error) {
            res.status(500).json({
                status: res.statusCode,
                // message: "GAGAL",
                // error: error,
                // body: req.body, query: query
            });
        }

    }
    run();
})

// === === === === === === === === === === === === END LINE ROD INSERT  === === === === === === === === === === === === ==

// === === === === === === === === === === === === START LINE TUBE INSERT  === === === === === === === === === === === ===



router.post('/addlinetube', async (req, res) => {
    async function run() {
        // const now = new Date();
        // const todaye = format(now, 'dd-MMM-yy').toUpperCase();

        const valuenya = {
            pic_name: req.body.pic_name,
            prod_date: moment(req.body.prod_date).format('DD-MMM-YY').toUpperCase(),
            pdo_no: req.body.pdo_no,
            pdo_prd: req.body.pdo_prd,
            prod_result: req.body.prod_result,

            tube_ok: req.body.tube_ok,
            tube_ng: req.body.tube_ng,
            tube_note: req.body.tube_note,

            // created_date        : todaye
        };

        try {
            connection = await oracledb.getConnection(configDB);
            // var query = `INSERT INTO Z3_SUPPLY(PIC_NAME,SUP_DATE,PDO_NO,SUP_RESULT) values('${pic_name}','${sup_date}','${pdo_no}','${sup_result}')`;
            // var query1 = `INSERT INTO Z3_PROD_PROGRESS(PIC_NAME,PROD_DATE,PDO_NO,PROD_RESULT,TUBE_OK,TUBE_NG,TUBE_NOTE,CREATED_DATE)`;
            // var query2= `values(:pic_name,:prod_date,:pdo_no,:prod_result,:tube_ok,:tube_ng,:tube_note,:created_date)`;
            // var query = query1+query2;

            var query = `CALL Z3_ADD_PROD(:pic_name,:prod_date,:pdo_no,:pdo_prd,:prod_result,'LINE TUBE',:tube_ok,:tube_ng,:tube_note)`;
            const result = await connection.execute(query, valuenya, { autoCommit: true });
            res.status(200).json({
                status: res.statusCode,
                message: "Connection success",
                // result: result
            });
            await connection.close();
        } catch (error) {
            res.status(500).json({
                status: res.statusCode,
                // message: "GAGAL",
                // error: error,
                // body: req.body, query: query
            });
        }

    }
    run();
})



// === === === === === === === === === === === === END LINE TUBE INSERT  === === === === === === === === === === === === =

// === === === === === === === === === === === === START LINE ASSEMBLY INSERT  === === === === === === === === === === ===


router.post('/addassembly', async (req, res) => {
    async function run() {
        // const now = new Date();
        // const todaye = format(now, 'dd-MMM-yy').toUpperCase();

        const valuenya = {
            pic_name: req.body.pic_name,
            prod_date: moment(req.body.prod_date).format('DD-MMM-YY').toUpperCase(),
            pdo_no: req.body.pdo_no,
            pdo_prd: req.body.pdo_prd,
            prod_result: req.body.prod_result,

            assembly_ok: req.body.assembly_ok,
            assembly_ng: req.body.assembly_ng,
            assembly_note: req.body.assembly_note,

            // created_date        : todaye
        };

        try {
            connection = await oracledb.getConnection(configDB);
            // var query = `INSERT INTO Z3_SUPPLY(PIC_NAME,SUP_DATE,PDO_NO,SUP_RESULT) values('${pic_name}','${sup_date}','${pdo_no}','${sup_result}')`;
            // var query1 = `INSERT INTO Z3_PROD_PROGRESS(PIC_NAME,PROD_DATE,PDO_NO,PROD_RESULT,ASSEMBLY_OK,ASSEMBLY_NG,ASSEMBLY_NOTE,CREATED_DATE)`;
            // var query2= `values(:pic_name,:prod_date,:pdo_no,:prod_result,:assembly_ok,:assembly_ng,:assembly_note,:created_date)`;
            // var query = query1+query2;

            var query = `CALL Z3_ADD_PROD(:pic_name,:prod_date,:pdo_no,:pdo_prd,:prod_result,'LINE ASSEMBLY',:assembly_ok,:assembly_ng,:assembly_note)`;
            const result = await connection.execute(query, valuenya, { autoCommit: true });
            res.status(200).json({
                status: res.statusCode,
                message: "Connection success",
                // result: result
            });
            await connection.close();
        } catch (error) {
            res.status(500).json({
                status: res.statusCode,
                // message: "GAGAL",
                // error: error,
                // body: req.body, query: query
            });
        }

    }
    run();
})


// === === === === === === === === === === === === END LINE ASSEMBLY INSERT  === === === === === === === === === === === =

// === === === === === === === === === === === === START LINE PAINTING INSERT  === === === === === === === === === === ===


router.post('/addpainting', async (req, res) => {
    async function run() {
        // const now = new Date();
        // const todaye = format(now, 'dd-MMM-yy').toUpperCase();

        const valuenya = {
            pic_name: req.body.pic_name,
            prod_date: moment(req.body.prod_date).format('DD-MMM-YY').toUpperCase(),
            pdo_no: req.body.pdo_no,
            pdo_prd: req.body.pdo_prd,
            prod_result: req.body.prod_result,

            painting_ok: req.body.painting_ok,
            painting_ng: req.body.painting_ng,
            painting_note: req.body.painting_note,

            // created_date        : todaye
        };

        try {
            connection = await oracledb.getConnection(configDB);
            // var query = `INSERT INTO Z3_SUPPLY(PIC_NAME,SUP_DATE,PDO_NO,SUP_RESULT) values('${pic_name}','${sup_date}','${pdo_no}','${sup_result}')`;
            // var query1 = `INSERT INTO Z3_PROD_PROGRESS(PIC_NAME,PROD_DATE,PDO_NO,PROD_RESULT,PAINTING_OK,PAINTING_NG,PAINTING_NOTE,CREATED_DATE)`;
            // var query2= `values(:pic_name,:prod_date,:pdo_no,:prod_result,:painting_ok,:painting_ng,:painting_note,:created_date)`;
            // var query = query1+query2;

            var query = `CALL Z3_ADD_PROD(:pic_name,:prod_date,:pdo_no,:pdo_prd,:prod_result,'LINE PAINTING',:painting_ok,:painting_ng,:painting_note)`;
            const result = await connection.execute(query, valuenya, { autoCommit: true });
            res.status(200).json({
                status: res.statusCode,
                message: "Connection success",
                // result: result
            });
            await connection.close();
        } catch (error) {
            res.status(500).json({
                status: res.statusCode,
                // message: "GAGAL",
                // error: error,
                // body: req.body, query: query
            });
        }

    }
    run();
})


// === === === === === === === === === === === === END LINE PAINTING INSERT  === === === === === === === === === === === =




module.exports = router;