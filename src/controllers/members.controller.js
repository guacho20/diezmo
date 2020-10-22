import { pool } from "../database/connection";

export const find = async(req, res) => {
    const sql = `select * from rec_clientes limit 100`;
    await pool.query(sql, (err, resp) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al ejecutar SQL',
                errors: err.message
            });
        }
        res.status(200).json({
            members: resp.rows
        });
    });
};