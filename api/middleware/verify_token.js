
const jwt = require('jsonwebtoken')


function auth(req, res, next) {
    const token = req.header('auth-token')
    if (!token) return res.status(401).send('Access Denied')
    try {
        const verifikasi = jwt.verify(token, process.env.TOKEN_RAHASIA)
        req.user = verifikasi
        next()
    } catch (error) {
        // res.status(400).send('Invalid Token')
        res.status(400).json({
            message: error
        })
    }
    // jwt.verify(token, process.env.TOKEN_RAHASIA, (err, decoded) => {
    //     if (err) {
    //         // Terjadi kesalahan saat memverifikasi token
    //         // console.log('Token tidak valid.');
    //         res.status(400).send('Token tidak valid')
    //     } else {
    //         // Token berhasil diverifikasi
    //         // console.log('Token valid.');
    //         if (decoded.exp) {
    //             // const expirationTime = new Date(decoded.exp * 1000);
    //             // console.log('Token kedaluwarsa pada: ');
    //             res.status(400).send('Token expired')
    //         }
    //     }
    // })
}

module.exports = auth; 