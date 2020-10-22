import { pool } from "../database/connection";

export const menuOptions = async(req, res) => {
    const sql = `select * from sis_opcion where sis_ide_opci is null`;
    try {
        const menu = await pool.query(sql);
        res.status(200).json({
            menus: menu.rows
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message
        });
    }
};

export const createOptions = async(req, res) => {
    const { sis_ide_opci, nom_opci, rut_opci, des_opci } = req.body;
    const sql = {
        text: `insert into sis_opcion(
            sis_ide_opci, nom_opci, rut_opci, des_opci)
        values ($1, $2, $3, $4)`,
        values: [sis_ide_opci, nom_opci, rut_opci, des_opci]
    };
    try {
        const options = await pool.query(sql);
        res.status(200).json({
            options: options
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message
        });
    }
};