import { pool } from "../database/connection";

export const find = async(req, res) => {
    const sql = `select * from sis_usuario`;
    await pool.query(sql, (err, resp) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al ejecutar SQL',
                error: err.message
            });
        }
        res.status(200).json({
            users: resp.rows
        });
    });
};

export const FindByOne = async(req, res) => {
    const sql = {
        text: `select * from sis_usuario where ide_usua =$1`,
        values: [req.params.id],
    };
    try {
        const user = await pool.query(sql);
        user.rows[0].password_usua = ':)';
        console.log(user.rows[0]);
        res.status(200).json({
            users: user.rows
        });
    } catch (error) {
        console.log(error);
    }
};

export const changePassword = async(req, res) => {
    const { pass1 } = req.body;
    const sql = {
        text: `update sis_usuario set password_usua=$1 from   where ide_usua=$2`,
        values: [pass1, req.params.id],
    };
    try {
        const user = await pool.query(sql);
        res.status(200).json({
            users: 'Change password succesfull'
        });

    } catch (error) {
        console.log(error);
    }
};