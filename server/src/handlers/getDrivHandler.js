const {getDrivers} = require("../controllers/getDrivers");

const getDriversHandler = async (req, res) => {
    try {
        const {name} = req.query;
        const response = await getDrivers(name);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

module.exports = {
    getDriversHandler
}