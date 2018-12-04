const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const Usuario = require('../models/usuario');
const app = express();

app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                error: true,
                mensaje: err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                error: true,
                mensaje: '(Usuario) o contraseña incorrectos '
            });
        }

        if (!body.password || !bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                error: true,
                mensaje: 'Usuario o (contraseña) incorrectos '
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            error: false,
            usuario: usuarioDB,
            token
        });

    });

});

//Configuraciones de google

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}

app.post('/google', async(req, res) => {

    let token = req.body.idtoken;

    let googleUser = await verify(token)
        .catch(err => {
            return res.status(403).json({
                error: true,
                mensaje: err
            });
        });

    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                error: true,
                mensaje: err
            });
        }

        if (usuarioDB) {
            if (usuarioDB.google === false) {
                return res.status(400).json({
                    error: true,
                    mensaje: 'Debe de usar su autenticacion normal.'
                });
            } else {
                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

                return res.json({
                    error: false,
                    usuario: usuarioDB,
                    token
                });
            }
        } else { //Si el usuario no existe en la BD
            let usuario = new Usuario();

            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.google = true;
            usuario.img = googleUser.img;
            usuario.password = ':)';

            usuario.save((err, usuarioDB) => {

                console.log("USUARIO!!!!", usuarioDB);

                if (err) {
                    return res.status(500).json({
                        error: true,
                        mensaje: err
                    });
                }

                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

                return res.json({
                    error: false,
                    usuario: usuarioDB,
                    token
                });

            });

        }

    });

});

module.exports = app;