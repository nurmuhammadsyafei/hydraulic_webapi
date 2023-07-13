const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const { lokalKi, localConfig } = require('../../config/db');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());

router.get('/:param', (req, res, next) => {
    const db = req.params.db;
    async function run() {
        var connection;
        try {
            connection = await oracledb.getConnection(localConfig);
            let query = 'SELECT to_char(id_karyawan)id_karyawan,nama,to_char(telp)telp,alamat,to_char(branch)branch,to_char(spv)spv FROM karyawan where rownum<=1';
            const result = await connection.execute(query);
            const data = result.rows;
            res.status(200).json({
                message: "Connection success",
                data: data
            });
        } catch (error) {
            res.status(200).json({
                message: "ERROR",
                error: error
            });
        }
    }
    run();
});

router.post('/add', async (req, res) => {
    async function run() {
        const binds = [req.body.id_karyawan, req.body.nama, req.body.telp, req.body.alamat, req.body.branch, req.body.spv];
        try {
            connection = await oracledb.getConnection(localConfig);
            var query = `INSERT INTO karyawan(id_karyawan,nama,telp,alamat,branch,spv) values(:id_karyawan,:nama,:telp,:alamat,:branch,:spv)`;
            const result = await connection.execute(query, binds, { autoCommit: true });

            res.status(200).json({
                message: "Connection success",
                result: result
            });

            await connection.close();
        } catch (error) {
            res.status(200).json({
                message: "GAGAL",
                error: error
            });
        }
    }
    run();
})





















router.get('/', async (req, res, next) => {
    // res.status(200).json({
    //     message : "This is method example get"
    // });
    async function run() {
        var connection;
        try {
            connection = await oracledb.getConnection(localConfig);
            let query = 'select * from z3_user_test';
            const result = await connection.execute(query);
            const data = result.rows;
            res.status(200).json({
                message: "Connection success",
                data: data
            });
        } catch (error) {
            res.status(200).json({
                message: "ERROeR",
                error: error
            });
        }
    }
    run();
});
// router.post('/',(req,res,next)=>{
//     res.status(200).json({
//         message : "This is method example POST"
//     });
// });

router.patch('/:param1/:param2', (req, res, next) => {
    res.status(200).json({
        message: "Ini adalah methos PATCH"
    })
})

router.delete('/:param1/:param2', (req, res, next) => {
    res.status(200).json({
        message: "Ini adalah methos DELETE"
    })
})

// method dengan ID
router.get('/:exampleID/:abcde', (req, res, next) => {
    const id = req.params.exampleID;
    const abcde = req.params.abcde;
    if (id === 'special') {
        res.status(200).json({
            message: "Kamu memasukkan id SPESIAL",
            id: id, abcde: abcde
        })
    } else {
        res.status(200).json({
            message: "kamu memasukkan id yg lain",
            id: id, abcde: abcde
        })
    }
})



module.exports = router;