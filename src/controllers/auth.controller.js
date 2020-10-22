import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { pool } from '../database/connection';
require('dotenv').config();
export const signUp = async(req, res) => {
    const { nom_usua, mail_usua, password_usua, fecha_reg_usua, activo_usua, tema_usua, bloqueado_usua, fecha_caduc_usua, cambia_clave_usua } = req.body;
    const clave = bcrypt.hashSync(password_usua, 10);
    const sql = {
        text: `insert into sis_usuario(
            nom_usua, mail_usua, password_usua, fecha_reg_usua, activo_usua, 
            tema_usua, bloqueado_usua, fecha_caduc_usua, cambia_clave_usua)
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        values: [nom_usua, mail_usua, clave, fecha_reg_usua, activo_usua, tema_usua, bloqueado_usua, fecha_caduc_usua, cambia_clave_usua],
    };
    await pool.query(sql, (err, resp) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al ejecutar SQL',
                errors: err.message
            });
        }
        res.status(200).json({
            user: resp.rows
        });
    });
};

export const signIn = async(req, res) => {
    const { email, password } = req.body;
    const fechaActual = moment(Date.now()).format('DD-MM-YYYY');
    const sql = {
        text: `select ide_usua,nom_usua,mail_usua,password_usua,fecha_reg_usua,activo_usua,tema_usua,
        bloqueado_usua,fecha_caduc_usua,cambia_clave_usua,a.ide_perf,nom_perf 
        from sis_usuario a, sis_perfil b  
        where a.ide_perf=b.ide_perf and mail_usua=$1`,
        values: [email],
    };
    try {
        const user = await pool.query(sql);
        let payload = null;
        if (!user.rowCount) {
            return res.status(401).json({ message: 'La dirección de correo electrónico o la contraseña es incorrecta' });
        }
        if (!bcrypt.compareSync(password, user.rows[0].password_usua)) {
            return res.status(401).json({ message: 'La dirección de correo electrónico o la contraseña es incorrecta' });
        }
        if (user.rows[0].bloqueado_usua === true) {
            return res.status(401).json({ message: 'El usuario esta bloqueado, contactese con el administrador del sistema' });
        }
        const fechaCaduca = moment(user.rows[0].fecha_caduc_usua).format('DD-MM-YYYY');
        if (fechaActual > fechaCaduca) {
            return res.status(401).json({ message: 'La vigencia de su clave a caducado, contactese con el administrador del sistema' });
        }
        user.rows[0].password_usua = null;
        payload = user.rows[0];
        res.status(200).json({
            token: jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "10m" })
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message
        });
    }
};