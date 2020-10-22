export const index = async(req, res) => {
    res.status(200).json({
        message: 'Endpoint ejecutando correctamente'
    });
};