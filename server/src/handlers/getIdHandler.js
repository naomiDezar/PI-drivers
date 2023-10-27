const {gId} = require("../controllers/getIdController");

const getIdHandler = async (req, res) => {
    const {id} = req.params;
    const source = isNaN(id) ? "bdd" : "api"
    try {
        const drivers = await gId(id, source);
        res.status(200).json(drivers);
    }catch (error) {
        res.status(400).json({ error: error.message })
    }
};

module.exports = {
    getIdHandler
}