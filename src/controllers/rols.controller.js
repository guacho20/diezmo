import { pool } from "../database/connection";

export const getRols = async(req, res) => {
    const sql = `select * from sis_perfil`;
    try {
        const rols = await pool.query(sql);
        res.status(200).json({
            rols: rols.rows
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message,
            detail: sql
        });
    }
};

export const getRolsById = async(req, res) => {
    const id = req.params.id;
    const sql = {
        text: `select * from sis_perfil where ide_perf=$1`,
        values: [id]
    };
    try {
        const rols = await pool.query(sql);
        res.status(200).json({
            rols: rols.rows
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message
        });
    }
};

export const createRols = async(req, res) => {
    const { nom_perf, descripcion_perf, activo_perf } = req.body;
    const sql = {
        text: `insert into sis_perfil(nom_perf, descripcion_perf, activo_perf)
                VALUES ($1, $2, $3);`,
        values: [nom_perf, descripcion_perf, activo_perf]
    };
    try {
        const rols = await pool.query(sql);
        res.status(200).json({
            rols: rols.rows
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message
        });
    }
};

export const updateRols = async(req, res) => {
    const { nom_perf, descripcion_perf, activo_perf } = req.body;
    const id = req.params.id;
    const sql = {
        text: `update sis_perfil
        set nom_perf=$1, descripcion_perf=$2, activo_perf=$3
        where ide_perf=$4`,
        values: [nom_perf, descripcion_perf, activo_perf, id]
    };
    try {
        const rols = await pool.query(sql);
        res.status(200).json({
            rols: rols.rows
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message
        });
    }

};

export const deleteRols = async(req, res) => {
    const id = req.params.id;
    const sql = {
        text: `delete from sis_perfil where ide_perf=$1`,
        values: [id]
    };
    try {
        const rols = await pool.query(sql);
        res.status(200).json({
            rols: rols
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message
        });
    }
};