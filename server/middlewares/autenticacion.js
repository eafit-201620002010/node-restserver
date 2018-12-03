const jwt = require('jsonwebtoken');

// =====================
// Verificar token
// =====================
let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                error: true,
                err
            });
        }

        req.usuario = decoded.usuario;
        next();

    });

};

// =====================
// Verificar ADMIN_ROLE
// =====================
let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            error: true,
            err: 'El usuario no es administrador'
        });
    }

}

module.exports = {
    verificaToken,
    verificaAdmin_Role
};