const {gTeams} = require("../controllers/getTeams");

const getTeamsHandler = async (req, res) => {
    try{
        const response = await gTeams();
        res.status(200).json(response);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getTeamsHandler
}